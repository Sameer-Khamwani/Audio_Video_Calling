import { useState } from "react";
import { Alert, Image, Linking, PermissionsAndroid, Platform, TouchableOpacity, View } from "react-native";
import RNFS from "react-native-fs";
import icons from "../../../Assets/Icons";
import AppWrapper from "../../../Components/AppWrapper";
import Button from "../../../Components/Button";
import CustomText from "../../../Components/CustomText";
import ImageIcons from "../../../Components/ImageIcons/Icons";
import Row from "../../../Components/Row";
import colors from "../../../Utils/theme";
import { styles } from "./styles";
import Toast from "react-native-toast-message";
import ModalComponent from "../../../Components/Modal";

const AnalyticsScreen = () => {
    const [activeTab, setActiveTab] = useState<"daily" | "monthly" | "yearly">("daily");
    const [isDownloading, setIsDownloading] = useState(false);
    const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);

    const requestAndroidStoragePermission = async () => {
        if (Platform.OS !== "android") return true;
        if (Platform.Version >= 33) return true;

        const result = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
        );
        return result === PermissionsAndroid.RESULTS.GRANTED;
    };

    const handleDownloadReport = async () => {
        setIsDownloadModalOpen(false);
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
        <AppWrapper>
            <View style={styles.earningsCard}>
                <Row style={styles.earningsRow}>
                    <View>
                        <CustomText text="Total Earned" color={colors.white} />
                        <CustomText text="$12,450.80" color={colors.white} size={28} weight="bold" />
                        <CustomText text="Updated just now" size={12} color={colors.white} />
                    </View>
                    <ImageIcons source={icons.designDollar} size={75} color={colors.white} />
                </Row>

            </View>
            <Row style={styles.metricCardsRow}>
                <View style={[styles.metricCard, styles.metricCardCompact]}>
                    {/* <ImageIcons source={icons.todaysAppointment} size={40} /> */}
                    <CustomText text="This Month" color={colors.lightGray} size={13} />
                    <CustomText text="$4,403" weight="semibold" size={16} color={colors.black} />
                </View>
                <View style={styles.metricCard}>
                    {/* <ImageIcons source={icons.todaysAppointment} size={40} /> */}
                    <CustomText text="Last Month" color={colors.lightGray} size={13} />
                    <CustomText text="$3,820" weight="semibold" size={16} color={colors.black} />
                </View>
                <View style={styles.metricCard}>
                    {/* <ImageIcons source={icons.todaysAppointment} size={40} /> */}
                    <CustomText text="Pending" size={13} color={colors.lightGray} />
                    <CustomText text="$850" weight="semibold" size={16} color={colors.black} />
                </View>
            </Row>
            <View style={styles.segmentedContainer}>
                <TouchableOpacity
                    style={[styles.segmentButton, activeTab === "daily" && styles.segmentButtonActive]}
                    onPress={() => setActiveTab("daily")}
                >
                    <CustomText
                        text="Daily"
                        weight={activeTab === "daily" ? "semibold" : "regular"}
                        color={activeTab === "daily" ? colors.white : "#7E8795"}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.segmentButton, activeTab === "monthly" && styles.segmentButtonActive]}
                    onPress={() => setActiveTab("monthly")}
                >
                    <Row gap={8} alignItems="center">
                        <CustomText
                            text="Monthly"
                            weight={activeTab === "monthly" ? "semibold" : "regular"}
                            color={activeTab === "monthly" ? colors.white : "#7E8795"}
                        />
                    </Row>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.segmentButton, activeTab === "yearly" && styles.segmentButtonActive]}
                    onPress={() => setActiveTab("yearly")}
                >
                    <Row gap={8} alignItems="center">
                        <CustomText
                            text="Yearly"
                            weight={activeTab === "yearly" ? "semibold" : "regular"}
                            color={activeTab === "yearly" ? colors.white : "#7E8795"}
                        />
                    </Row>
                </TouchableOpacity>
            </View>

            <Image source={icons.barChart} style={styles.chartImage} />

            <Button
                children="Download Report"
                buttonType="secondary"
                icon={icons.download}
                iconColor={colors.black}
                style={styles.downloadButton}
                onPress={() => setIsDownloadModalOpen(true)}
                loader={isDownloading}
                iconSize={18}
                loaderColor={colors.black}
            />
            <ModalComponent
                open={isDownloadModalOpen}
                close={() => setIsDownloadModalOpen(false)}
                icon={icons.downloadReport}
                header="Download Report"
                text={`Are you sure you want to download the ${activeTab} report?`}
                buttonStyle={styles.downloadModalButtonRow}
                buttons={[
                    { text: "Yes, Download", onPress: handleDownloadReport, },
                    { text: "No", onPress: () => setIsDownloadModalOpen(false) },
                ]}
            >
                <CustomText text="The report will be saved in the Downloads folder on your device." size={14} color={colors.gray} style={styles.downloadModalHintText} />
            </ModalComponent>
        </AppWrapper>
    )
}

export default AnalyticsScreen;