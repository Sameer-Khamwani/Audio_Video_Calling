import { useState } from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import AppWrapper from "../../../Components/AppWrapper";
import CustomText from "../../../Components/CustomText";
import Row from "../../../Components/Row";
import ImageIcons from "../../../Components/ImageIcons/Icons";
import styles from "./styles";
import { icons } from "../../../Assets/Icons";
import colors from "../../../Utils/theme";
import { TermsSection } from "../../../Utils/interface";
import { termsMeta, termsSections } from "../../../Utils/data";

const TermsAndConditions = () => {
  const [expandedIds, setExpandedIds] = useState<string[]>(
    termsSections.filter(section => section.expandedByDefault).map(section => section.id),
  );

  const toggleSection = (id: string) => {
    setExpandedIds(prev => (prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]));
  };

  return (
    <AppWrapper paddingHorizontal={0}>
      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <CustomText text={termsMeta.title} size={34} weight="bold" />
        <Row gap={8} alignItems="center" style={styles.updatedRow}>
          <View style={styles.updatedDot} />
          <CustomText text={termsMeta.lastUpdated} color="#8F99A8" size={12} />
        </Row>

        <View style={styles.introCard}>
          <CustomText text={termsMeta.intro} size={14} />
        </View>

        <View style={styles.sectionsCard}>
          {termsSections.map((section, index) => {
            const isExpanded = expandedIds.includes(section.id);
            return (
              <View key={section.id}>
                <TouchableOpacity activeOpacity={0.8} onPress={() => toggleSection(section.id)} style={styles.sectionRow}>
                  <Row justifyContent="space-between" alignItems="center">
                    <Row gap={10} alignItems="center">
                      <ImageIcons source={section.icon} size={18} color={colors.primary} disabled />
                      <CustomText text={section.title} size={14} weight="semibold" />
                    </Row>
                    <ImageIcons
                      source={icons.greaterThan}
                      size={12}
                      color={colors.gray}
                      style={isExpanded ? styles.sectionChevronExpanded : styles.sectionChevronCollapsed}
                      disabled
                    />
                  </Row>
                  {isExpanded && section.content.length ? (
                    <View style={styles.sectionContent}>
                      {section.content.map((paragraph, pIdx) => (
                        <CustomText key={`${section.id}-${pIdx}`} text={paragraph} color="#8F99A8" size={12} style={pIdx === 0 ? undefined : styles.paragraphSpacing} />
                      ))}
                    </View>
                  ) : null}
                </TouchableOpacity>
                {index < termsSections.length - 1 ? <View style={styles.divider} /> : null}
              </View>
            );
          })}
        </View>
      </ScrollView>
    </AppWrapper>
  );
};

export default TermsAndConditions;

