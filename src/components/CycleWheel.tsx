import React, { useState, useRef, useCallback } from 'react';
import { View, Text, StyleSheet, Animated, GestureResponderEvent } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { COLORS, FONTS, FONT_FAMILY, SPACING, RADIUS } from '../utils/theme';
import { PhaseName, PhaseBoundaries } from '../types';
import { computePhaseBoundaries, getPhaseForDay } from '../utils/phaseEngine';

const PHASE_COLORS: Record<PhaseName, string> = {
  menstrual: COLORS.menstrual,
  follicular: COLORS.follicular,
  ovulatory: COLORS.ovulatory,
  luteal: COLORS.luteal,
};

interface CycleWheelProps {
  cycleLength: number;
  periodLength: number;
  currentDay: number;
  phaseName: PhaseName;
  phaseDisplayName: string;
  phaseEmoji: string;
  onDayPreview?: (day: number | null) => void;
}

const SIZE = 280;
const VIEWBOX = 200;
const CX = 100;
const CY = 100;
const R = 76;
const STROKE = 16;
const CIRCUMFERENCE = 2 * Math.PI * R;

const RING_SCREEN_R = SIZE * (R / VIEWBOX);

type PhaseArc = { phase: PhaseName; startDay: number; days: number };

function getPhaseArcs(boundaries: PhaseBoundaries): PhaseArc[] {
  const order: PhaseName[] = ['menstrual', 'follicular', 'ovulatory', 'luteal'];
  return order.map((phase) => {
    const b = boundaries[phase];
    return { phase, startDay: b.start, days: b.end - b.start + 1 };
  });
}

function touchToCycleDay(
  evt: GestureResponderEvent,
  cycleLength: number
): number | null {
  const { locationX, locationY } = evt.nativeEvent;
  const cx = SIZE / 2;
  const cy = SIZE / 2;
  const dx = locationX - cx;
  const dy = locationY - cy;
  const dist = Math.sqrt(dx * dx + dy * dy);

  if (dist < RING_SCREEN_R * 0.3 || dist > RING_SCREEN_R * 1.7) return null;

  let angle = Math.atan2(dy, dx) + Math.PI / 2;
  if (angle < 0) angle += 2 * Math.PI;

  const day = Math.floor((angle / (2 * Math.PI)) * cycleLength) + 1;
  return Math.max(1, Math.min(cycleLength, day));
}

function isTouchOnRing(locationX: number, locationY: number): boolean {
  const cx = SIZE / 2;
  const cy = SIZE / 2;
  const dx = locationX - cx;
  const dy = locationY - cy;
  const dist = Math.sqrt(dx * dx + dy * dy);
  return dist >= RING_SCREEN_R * 0.3 && dist <= RING_SCREEN_R * 1.7;
}

export default function CycleWheel({
  cycleLength,
  periodLength,
  currentDay,
  phaseName,
  phaseDisplayName,
  phaseEmoji,
  onDayPreview,
}: CycleWheelProps) {
  const [previewDay, setPreviewDay] = useState<number | null>(null);
  const isDragging = useRef(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const displayDay = previewDay ?? currentDay;
  const displayPhase = previewDay
    ? getPhaseForDay(previewDay, cycleLength, periodLength)
    : null;

  const dName = displayPhase?.displayName ?? phaseDisplayName;
  const dEmoji = displayPhase?.emoji ?? phaseEmoji;
  const dPhaseName = displayPhase?.name ?? phaseName;

  const boundaries = computePhaseBoundaries(cycleLength, periodLength);
  const arcs = getPhaseArcs(boundaries);

  const dayAngle = ((displayDay - 1) / cycleLength) * 2 * Math.PI - Math.PI / 2;
  const dotX = CX + R * Math.cos(dayAngle);
  const dotY = CY + R * Math.sin(dayAngle);

  const handleGrant = useCallback(
    (evt: GestureResponderEvent) => {
      isDragging.current = true;
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }).start();
      const day = touchToCycleDay(evt, cycleLength);
      if (day !== null) {
        setPreviewDay(day);
        onDayPreview?.(day);
      }
    },
    [cycleLength, fadeAnim, onDayPreview]
  );

  const handleMove = useCallback(
    (evt: GestureResponderEvent) => {
      const day = touchToCycleDay(evt, cycleLength);
      if (day !== null) {
        setPreviewDay(day);
        onDayPreview?.(day);
      }
    },
    [cycleLength, onDayPreview]
  );

  const handleRelease = useCallback(() => {
    isDragging.current = false;
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
    setPreviewDay(null);
    onDayPreview?.(null);
  }, [fadeAnim, onDayPreview]);

  const isPreview = previewDay !== null;

  return (
    <View style={styles.container}>
      <View style={styles.wheelWrap}>
        <Svg width={SIZE} height={SIZE} viewBox={`0 0 ${VIEWBOX} ${VIEWBOX}`}>
          <Circle
            cx={CX}
            cy={CY}
            r={R}
            stroke={COLORS.border}
            strokeWidth={STROKE + 2}
            fill="none"
            opacity={0.35}
          />

          {arcs.map(({ phase, startDay, days }) => {
            const arcLen = (days / cycleLength) * CIRCUMFERENCE;
            const offset = ((startDay - 1) / cycleLength) * CIRCUMFERENCE;
            return (
              <Circle
                key={phase}
                cx={CX}
                cy={CY}
                r={R}
                stroke={PHASE_COLORS[phase]}
                strokeWidth={STROKE}
                fill="none"
                strokeDasharray={`${arcLen} ${CIRCUMFERENCE - arcLen}`}
                strokeDashoffset={-offset}
                strokeLinecap="butt"
                rotation={-90}
                origin={`${CX}, ${CY}`}
              />
            );
          })}

          <Circle cx={dotX} cy={dotY} r={10} fill={PHASE_COLORS[dPhaseName]} opacity={0.18} />
          <Circle cx={dotX} cy={dotY} r={7} fill={PHASE_COLORS[dPhaseName]} opacity={0.3} />
          <Circle cx={dotX} cy={dotY} r={4.5} fill="#FFFFFF" />
          <Circle cx={dotX} cy={dotY} r={3.5} fill={PHASE_COLORS[dPhaseName]} />
        </Svg>

        <View style={styles.center} pointerEvents="none">
          <Text style={styles.emoji}>{dEmoji}</Text>
          <Text style={[styles.phaseName, { color: PHASE_COLORS[dPhaseName] }]}>
            {dName}
          </Text>
          <Text style={styles.dayText}>
            Day {displayDay} of {cycleLength}
          </Text>
          {isPreview && (
            <Animated.View style={[styles.previewBadge, { opacity: fadeAnim }]}>
              <Text style={styles.previewText}>Previewing</Text>
            </Animated.View>
          )}
        </View>

        {/* Touch overlay — sits on top of SVG and center text */}
        <View
          style={styles.touchOverlay}
          onStartShouldSetResponder={(evt) =>
            touchToCycleDay(evt, cycleLength) !== null
          }
          onMoveShouldSetResponder={() => isDragging.current}
          onResponderTerminationRequest={() => false}
          onResponderGrant={handleGrant}
          onResponderMove={handleMove}
          onResponderRelease={handleRelease}
          onResponderTerminate={handleRelease}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'center', paddingVertical: SPACING.sm },
  wheelWrap: {
    width: SIZE,
    height: SIZE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  touchOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: SIZE,
    height: SIZE,
  },
  center: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  emoji: { fontSize: 36, marginBottom: 4 },
  phaseName: {
    fontFamily: FONT_FAMILY.serif,
    fontSize: 24,
    fontWeight: '400',
  },
  dayText: {
    ...FONTS.regular,
    color: COLORS.textSecondary,
    fontSize: 14,
    marginTop: 2,
  },
  previewBadge: {
    marginTop: 6,
    backgroundColor: COLORS.primaryFaint,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 3,
    borderRadius: RADIUS.full,
  },
  previewText: {
    color: COLORS.primary,
    fontSize: 11,
    fontWeight: '600',
  },
});
