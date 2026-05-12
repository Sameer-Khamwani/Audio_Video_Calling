import { ScrollView, View } from "react-native";
import AppWrapper from "../../../Components/AppWrapper";
import CustomText from "../../../Components/CustomText";
import Row from "../../../Components/Row";
import ImageIcons from "../../../Components/ImageIcons/Icons";
import styles from "./styles";
import { icons } from "../../../Assets/Icons";
import colors from "../../../Utils/theme";
import { PrivacySection } from "../../../Utils/interface";
import { privacyMeta, privacySections } from "../../../Utils/data";

const PrivacyPolicy = () => {
    return (
        <AppWrapper paddingHorizontal={0}>
            <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                <View style={styles.headerWrap}>
                    <ImageIcons source={icons.privacy} size={30} color={colors.primary} disabled />
                    <CustomText text={privacyMeta.title} size={20} weight="bold" style={styles.title} />
                    <CustomText text={privacyMeta.lastUpdated} size={12} color="#8E97A6" style={styles.updatedText} />
                </View>
                <CustomText text={privacyMeta.intro} size={12} style={styles.introText} />

                {privacySections.map(section => (
                    <View key={section.id} style={styles.sectionWrap}>
                        <Row gap={8} alignItems="center" style={styles.sectionTitleRow}>
                            <ImageIcons source={section.icon} size={16} color={colors.primary} disabled />
                            <CustomText text={section.title} size={14} weight="semibold" />
                        </Row>

                        {section.paragraphs.map((paragraph, idx) => (
                            <CustomText key={`${section.id}-p-${idx}`} text={paragraph} size={12} style={styles.paragraph} />
                        ))}

                        {section.bullets?.length ? (
                            <View style={styles.bulletsCard}>
                                {section.bullets.map((bullet, idx) => (
                                    <Row key={`${section.id}-b-${idx}`} gap={8} style={styles.bulletRow}>
                                        <CustomText text="◎" size={10} color={colors.primary} />
                                        <CustomText text={bullet} size={11} color="#606977" style={styles.bulletText} />
                                    </Row>
                                ))}
                            </View>
                        ) : null}

                        {section.contactRows?.length ? (
                            <View style={styles.contactCard}>
                                {section.contactRows.map((row, idx) => (
                                    <View key={`${section.id}-c-${idx}`} style={idx < section.contactRows!.length - 1 ? styles.contactRowSpacing : undefined}>
                                        <CustomText text={row.label} size={10} color="#9AA3B2" />
                                        <CustomText text={row.value} size={12} weight="semibold" />
                                    </View>
                                ))}
                            </View>
                        ) : null}
                    </View>
                ))}
            </ScrollView>
        </AppWrapper>
    );
};

export default PrivacyPolicy;

