import { StyleSheet } from "react-native";
import { heightPixel, widthPixel } from "../../../Utils/helper";
import colors from "../../../Utils/theme";

export const styles = StyleSheet.create({
    earningsCard: {
        backgroundColor: colors.primary,
        padding: heightPixel(20),
        borderRadius: heightPixel(14),
    },
    earningsRow: {
        width: "100%",
        justifyContent: "space-between",
        alignItems: "center",
    },
    metricCardsRow: {
        gap: widthPixel(16),
        alignSelf: "center",
        marginVertical: heightPixel(4),
    },
    metricCard: {
        width: widthPixel(120),
        alignSelf: "center",
        marginVertical: heightPixel(10),
        backgroundColor: colors.white,
        padding: heightPixel(14),
        borderRadius: heightPixel(12),
        borderWidth: 1,
        borderColor: colors.border,
        minHeight: heightPixel(100),
    },
    metricCardCompact: {
        padding: heightPixel(12),
    },
    chartImage: {
        width: "100%",
        height: heightPixel(250),
        marginVertical: heightPixel(20),
    },
    downloadButton: {
        alignSelf: "center",
        width: "90%",
        marginTop: heightPixel(50),
    },
    segmentedContainer: {
        width: "100%",
        backgroundColor: "#ECEEF2",
        borderRadius: heightPixel(14),
        padding: heightPixel(5),
        flexDirection: "row",
        marginHorizontal: widthPixel(18),
    },
    segmentButton: {
        flex: 1,
        height: heightPixel(38),
        borderRadius: heightPixel(12),
        alignItems: "center",
        justifyContent: "center",
    },
    segmentButtonActive: {
        backgroundColor: colors.primary,
    },
    downloadModalButtonRow: {
        width: "45%",
    },
    downloadModalHintText: {
        textAlign: "center",
    },
})