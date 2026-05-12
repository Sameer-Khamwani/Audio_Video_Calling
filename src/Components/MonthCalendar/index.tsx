import React, { useEffect, useMemo, useRef } from "react";
import { Animated, TouchableOpacity, View } from "react-native";
import { icons } from "../../Assets/Icons";
import { heightPixel, widthPixel } from "../../Utils/helper";
import colors from "../../Utils/theme";
import CustomText from "../CustomText";
import ImageIcons from "../ImageIcons/Icons";
import Row from "../Row";
import { MonthCalendarProps } from "../../Utils/interface";
import styles from "./styles";

const MonthCalendar = ({
  selectedDateISO,
  onSelectDateISO,
  visibleMonthDate,
  onChangeVisibleMonthDate,
  isExpanded,
  onToggleExpand,
  countsByDate,
  showToggleButton = true,
}: MonthCalendarProps) => {
  const animatedValue = useRef(new Animated.Value(isExpanded ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: isExpanded ? 1 : 0,
      duration: 250,
      useNativeDriver: false,
    }).start();
  }, [animatedValue, isExpanded]);

  const height = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [heightPixel(170), '100%'] as unknown as number[],
  });

  const year = visibleMonthDate.getFullYear();
  const month = visibleMonthDate.getMonth();
  const first = new Date(year, month, 1);
  const startDay = first.getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const monthLabel = useMemo(
    () => first.toLocaleDateString(undefined, { month: "long", year: "numeric" }),
    [first],
  );

  const cells: Array<{ key: string; iso: string | null; day: number | null }> = [];
  for (let i = 0; i < startDay; i++) cells.push({ key: `e-${i}`, iso: null, day: null });
  for (let d = 1; d <= daysInMonth; d++) {
    const mm = String(month + 1).padStart(2, "0");
    const dd = String(d).padStart(2, "0");
    const iso = `${year}-${mm}-${dd}`;
    cells.push({ key: iso, iso, day: d });
  }
  while (cells.length % 7 !== 0) cells.push({ key: `t-${cells.length}`, iso: null, day: null });

  return (
    <Animated.View style={[styles.calendarCard, { height }]}>
      <Row justifyContent="space-between" alignItems="center">
        <TouchableOpacity
          onPress={() => onChangeVisibleMonthDate(addMonths(visibleMonthDate, -1))}
          style={styles.monthArrowBtn}
          hitSlop={10}
        >
          <ImageIcons source={icons.lessThan} size={16} color={colors.primary} disabled />
        </TouchableOpacity>
        <CustomText text={monthLabel} weight="bold" />
        <TouchableOpacity
          onPress={() => onChangeVisibleMonthDate(addMonths(visibleMonthDate, 1))}
          style={styles.monthArrowBtn}
          hitSlop={10}
        >
          <ImageIcons source={icons.greaterThan} size={16} color={colors.primary} disabled />
        </TouchableOpacity>
      </Row>
      <View style={styles.weekHeader}>
        {["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map(d => (
          <CustomText key={d} text={d} size={12} color={colors.lightGray} style={styles.weekDay} />
        ))}
      </View>
      {isExpanded ? (
        <View style={styles.grid}>
          {cells.map(c => {
            if (!c.iso) return <View key={c.key} style={styles.cell} />;
            const isSelected = c.iso === selectedDateISO;
            const count = countsByDate?.[c.iso] ?? 0;
            return (
              <TouchableOpacity
                activeOpacity={0.8}
                key={c.key}
                onPress={() => onSelectDateISO(c.iso!)}
                style={[styles.cell, isSelected && styles.cellSelected]}
              >
                <CustomText
                  text={String(c.day)}
                  color={colors.black}
                  weight={isSelected ? "bold" : "regular"}
                />
                {count > 0 ? (
                  <View style={styles.countBadge}>
                    <CustomText text={String(count)} size={10} color={colors.white} />
                  </View>
                ) : null}
              </TouchableOpacity>
            );
          })}
        </View>
      ) : null}
      {showToggleButton ? (
        <TouchableOpacity
          style={styles.calendarToggleButton}
          onPress={onToggleExpand}
          hitSlop={10}
          activeOpacity={0.7}
        >
          <ImageIcons
            source={icons.greaterThan}
            size={20}
            color={colors.primary}
            style={isExpanded ? styles.calendarToggleChevronExpanded : styles.calendarToggleChevronCollapsed}
            disabled
          />
        </TouchableOpacity>
      ) : null}
    </Animated.View>
  );
};

const addMonths = (date: Date, delta: number) => {
  const d = new Date(date);
  d.setDate(1);
  d.setMonth(d.getMonth() + delta);
  return d;
};

export default MonthCalendar;
