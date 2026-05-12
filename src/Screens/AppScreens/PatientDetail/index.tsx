import { useState } from "react";
import { Alert, FlatList, Linking, PermissionsAndroid, Platform, ScrollView, TouchableOpacity, View } from "react-native";
import dummyImages from "../../../Assets/DummyImages";
import { icons } from "../../../Assets/Icons";
import AppWrapper from "../../../Components/AppWrapper";
import Button from "../../../Components/Button";
import CustomText from "../../../Components/CustomText";
import ImageIcons from "../../../Components/ImageIcons/Icons";
import Row from "../../../Components/Row";
import {
    allergies,
    appointments,
    existingConditions,
    healthSummary,
    reports,
} from "../../../Utils/data";
import { AppointmentStatus, Tab } from "../../../Utils/interface";
import { navigate } from "../../../Utils/navigation";
import colors from "../../../Utils/theme";
import styles from "./styles";
import RNFS from "react-native-fs";
import Toast from "react-native-toast-message";

const statusConfig: Record<AppointmentStatus, { bg: string; text: string }> = {
    cancelled: { bg: colors.red, text: colors.white },
    completed: { bg: colors.lightGreen, text: colors.green },
    confirmed: { bg: colors.lightPrimary, text: colors.primary },
};

const PatientDetail = () => {
    const [activeTab, setActiveTab] = useState<Tab>("History");
    const [isDownloading, setIsDownloading] = useState(false);

    const requestAndroidStoragePermission = async () => {
        if (Platform.OS !== "android") return true;
        if (Platform.Version >= 33) return true;

        const result = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
        );
        return result === PermissionsAndroid.RESULTS.GRANTED;
    };

    const handleDownloadReport = async () => {
        try {
            setIsDownloading(true);
            const reportUrl = "https://www.orimi.com/pdf-test.pdf";
            const timestamp = Date.now();
            const fileName = `analytics-${activeTab}-report-${timestamp}.pdf`;
            const hasPermission = await requestAndroidStoragePermission();
            if (!hasPermission) {
                Alert.alert("Permission Required", "Storage permission is required to save the report.");
                return;
            }

            // Try public Downloads first on Android. Fall back to app document directory if it fails.
            const preferredPath =
                Platform.OS === "android"
                    ? `${RNFS.DownloadDirectoryPath}/${fileName}`
                    : `${RNFS.DocumentDirectoryPath}/${fileName}`;
            const fallbackPath = `${RNFS.DocumentDirectoryPath}/${fileName}`;

            const attemptDownload = async (toFile: string) => {
                return RNFS.downloadFile({
                    fromUrl: reportUrl,
                    toFile,
                    background: true,
                }).promise;
            };

            let targetPath = preferredPath;
            let response = await attemptDownload(targetPath);

            if (response.statusCode !== 200 && targetPath !== fallbackPath) {
                targetPath = fallbackPath;
                response = await attemptDownload(targetPath);
            }

            if (response.statusCode === 200) {
                Toast.show({
                    visibilityTime: 1000,
                    text1: "Download Complete",
                    text2: `Report saved at: ${targetPath}`,
                    type: "success",
                    onHide: () => {
                        Linking.openURL(reportUrl);
                    }
                });
            } else {
                Alert.alert("Download Failed", `Unable to download report (status ${response.statusCode}).`);
            }
        } catch (error) {
            const message = error instanceof Error ? error.message : "Something went wrong while downloading the report.";
            Alert.alert("Download Failed", message);
        } finally {
            setIsDownloading(false);
        }
    };

    return (
        <AppWrapper paddingHorizontal={0}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {/* ── Profile card ── */}
                <View style={styles.profileCard}>
                    <ImageIcons source={dummyImages.patient} size={90} style={styles.avatar} />
                    <CustomText text="Sarah Jenkins" size={20} weight="bold" />
                    <CustomText
                        text="32 yrs • Female • ID: MC-84920"
                        color={colors.lightGray}
                        size={14}
                        weight="regular"
                        style={styles.profileSubText}
                    />
                    <Button
                        icon={icons.message}
                        children="Message"
                        onPress={() => { navigate('ViewChat') }}
                        style={styles.messageButton}
                    />
                </View>

                {/* ── Health summary ── */}
                <View style={styles.detailsCard}>
                    <Row gap={8} alignItems="center">
                        <ImageIcons source={icons.activity} size={20} color={colors.primary} />
                        <CustomText text="HEALTH SUMMARY" weight="semibold" color={colors.lightGray} />
                    </Row>

                    <FlatList
                        data={healthSummary}
                        keyExtractor={(item) => item.id}
                        numColumns={2}
                        scrollEnabled={false}
                        contentContainerStyle={styles.healthList}
                        columnWrapperStyle={styles.healthColumn}
                        renderItem={({ item }) => (
                            <View style={styles.healthItem}>
                                <Row gap={10} alignItems="center">
                                    <ImageIcons source={item.icon} size={40} />
                                    <View>
                                        <CustomText text={item.title} weight="regular" color={colors.lightGray} />
                                        <CustomText text={item.value} weight="semibold" />
                                    </View>
                                </Row>
                            </View>
                        )}
                    />

                    {/* Allergies */}
                    <CustomText text="Allergies" weight="semibold" color={colors.black} style={styles.sectionTitle} />
                    <FlatList
                        horizontal
                        data={allergies}
                        keyExtractor={(item) => item.id}
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.horizontalList}
                        renderItem={({ item }) => (
                            <View style={styles.allergyChip}>
                                <CustomText text={item.value} size={12} color={colors.red} />
                            </View>
                        )}
                    />

                    {/* Existing Conditions */}
                    <CustomText text="Existing Conditions" weight="semibold" color={colors.black} style={styles.sectionTitle} />
                    <FlatList
                        horizontal
                        data={existingConditions}
                        keyExtractor={(item) => item.id}
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.horizontalList}
                        renderItem={({ item }) => (
                            <View style={styles.conditionChip}>
                                <CustomText text={item.value} size={12} />
                            </View>
                        )}
                    />
                </View>

                {/* ── Tabs: History / Reports ── */}
                <View style={styles.tabsWrapper}>
                    {(["History", "Reports"] as Tab[]).map((tab) => (
                        <TouchableOpacity
                            key={tab}
                            style={[styles.tabBtn, activeTab === tab && styles.activeTabBtn]}
                            onPress={() => setActiveTab(tab)}
                            activeOpacity={0.8}
                        >
                            <CustomText
                                text={tab}
                                size={15}
                                weight={activeTab === tab ? "semibold" : "regular"}
                                color={activeTab === tab ? colors.primary : colors.lightGray}
                            />
                        </TouchableOpacity>
                    ))}
                </View>

                {/* ── Appointments (History tab) ── */}
                {activeTab === "History" && (
                    <FlatList
                        data={appointments}
                        keyExtractor={(item) => item.id}
                        scrollEnabled={false}
                        contentContainerStyle={styles.appointmentList}
                        ItemSeparatorComponent={() => <View style={styles.separator} />}
                        renderItem={({ item }) => {
                            const { bg, text: textColor } = statusConfig[item.status];
                            return (
                                <View style={styles.apptCard}>
                                    <Row justifyContent="space-between" style={styles.cardContent} gap={12}>
                                        {/* Date badge */}
                                        <View style={styles.visitBadge}>
                                            <CustomText text={item.month} size={10} weight="semibold" color={colors.lightGray} />
                                            <CustomText text={item.day} size={20} weight="bold" color={colors.primary} />
                                        </View>

                                        {/* Type + time */}
                                        <View style={styles.apptInfo}>
                                            <CustomText text={item.type} size={14} weight="semibold" />
                                            <Row gap={6} style={styles.metaRow}>
                                                <ImageIcons source={icons.clock} size={14} color={colors.lightGray} />
                                                <CustomText text={item.time} size={12} weight="regular" color={colors.lightGray} />
                                            </Row>
                                            <View style={[styles.statusChip, styles.clinicMode]}>
                                                <ImageIcons source={item.locationType === "In-Person" ? icons.locationPin : icons.online} size={14} color={colors.black} />
                                                <CustomText
                                                    text={item.locationType === "In-Person" ? "In-Person" : "Video Consult"}
                                                    size={11}
                                                    weight="semibold"
                                                />
                                            </View>
                                        </View>

                                        {/* Status + doctor */}
                                        <View style={styles.apptRight}>
                                            <View style={[styles.statusChip, { backgroundColor: bg }]}>
                                                <CustomText
                                                    text={item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                                                    size={11}
                                                    weight="semibold"
                                                    color={textColor}
                                                />
                                            </View>
                                            <CustomText text={item.doctor} size={11} weight="regular" color={colors.lightGray} style={styles.doctorText} />
                                        </View>
                                    </Row>
                                </View>
                            );
                        }}
                    />
                )}

                {/* ── Reports tab ── */}
                {activeTab === "Reports" && (
                    <FlatList
                        data={reports}
                        keyExtractor={(item) => item.id}
                        scrollEnabled={false}
                        contentContainerStyle={styles.appointmentList}
                        ItemSeparatorComponent={() => <View style={styles.separator} />}
                        renderItem={({ item }) => (
                            <TouchableOpacity activeOpacity={0.8} onPress={handleDownloadReport} style={styles.apptCard}>
                                <Row justifyContent="space-between" alignItems="center" style={styles.cardContent} gap={12}>
                                    {/* Report icon */}
                                    <View style={styles.reportIconWrapper}>
                                        <ImageIcons source={icons.activity} size={24} color={colors.primary} />
                                    </View>

                                    {/* Title + date */}
                                    <View style={styles.apptInfo}>
                                        <CustomText text={item.title} size={14} weight="semibold" />
                                        <Row gap={6} style={styles.metaRow}>
                                            <ImageIcons source={icons.calendar} size={14} color={colors.lightGray} />
                                            <CustomText text={item.date} size={12} weight="regular" color={colors.lightGray} />
                                        </Row>
                                        <CustomText text={item.doctor} size={11} weight="regular" color={colors.lightGray} />
                                    </View>

                                    <ImageIcons source={icons.download} size={24} color={colors.lightGray} />
                                </Row>
                            </TouchableOpacity>
                        )}
                    />
                )}
            </ScrollView>
        </AppWrapper>
    );
};

export default PatientDetail;
