import { StyleSheet } from "react-native";
import { heightPixel, widthPixel } from "../../../Utils/helper";
import colors from "../../../Utils/theme";

const cardShadow = {
    elevation: 4,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
};

const styles = StyleSheet.create({
    scroll: {
        flex: 1,
        width: "100%"
    },
    scrollContent: {
        flexGrow: 1,
        paddingBottom: heightPixel(26),
        alignItems: "center",
        paddingHorizontal: widthPixel(20)
    },
    card: {
        width: "100%",
        backgroundColor: colors.white,
        borderRadius: heightPixel(18),
        borderWidth: 1,
        borderColor: colors.lightBorder,
        padding: heightPixel(20),
        marginTop: heightPixel(12),
        ...cardShadow,
    },
    profileCardContent: {
        alignItems: "center",
        paddingHorizontal: widthPixel(20),
        paddingTop: heightPixel(0),
    },
    headerBanner: {
        width: "100%",
        height: heightPixel(100),
        backgroundColor: colors.lightPrimary,
        borderRadius: heightPixel(18),
        borderBottomLeftRadius: heightPixel(0),
        borderBottomRightRadius: heightPixel(0),
    },
    avatarWrap: {
        alignSelf: "center",
        marginTop: -heightPixel(52),
        position: "relative"
    },
    onlineDot: {
        position: "absolute",
        right: widthPixel(2),
        bottom: heightPixel(6),
        width: widthPixel(18),
        height: widthPixel(18),
        borderRadius: widthPixel(9),
        backgroundColor: "#25c95e",
        borderWidth: 2,
        borderColor: colors.white,
    },
    nameText: {
        textAlign: "center",
        marginTop: heightPixel(8)
    },
    subtitleText: {
        textAlign: "center",
        marginTop: heightPixel(0)
    },
    contactRow: {
        marginTop: heightPixel(14)
    },
    contactBox: {
        // flex: 1,
        backgroundColor: "#f6f7f9",
        borderRadius: heightPixel(14),
        paddingVertical: heightPixel(8),
        width: '48%',
        // paddingHorizontal: widthPixel(24),
        alignItems: "center",
        justifyContent: "center",
    },
    title: {
        marginBottom: heightPixel(10),
    },
    chipsRow: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: widthPixel(8),
    },
    chip: {
        backgroundColor: colors.lightBlue,
        borderRadius: heightPixel(14),
        paddingHorizontal: widthPixel(12),
        paddingVertical: heightPixel(2),
    },
    addButton: {
        width: "85%",
        marginTop: heightPixel(18)
    },
    fieldLabel: {
        marginTop: heightPixel(10),
        marginBottom: heightPixel(2)
    },
    scheduleRow: {
        width: "100%",
        alignItems: "center",
    },
    dayPickerWrap: {
        width: "48%"
    },
    timeInputWrap: {
        flex: 1,
    },
    removeScheduleBtn: {
        paddingHorizontal: widthPixel(0)
    },
    linkBtn: {
        marginTop: heightPixel(10), alignSelf: "flex-start"
    },
    locationItemCard: {
        elevation: 4,
        shadowColor: colors.black,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        width: "100%",
        marginTop: heightPixel(14),
        borderRadius: heightPixel(16),
        borderWidth: 1,
        borderColor: "#d2d2d2",
        padding: heightPixel(12),
        backgroundColor: colors.white,
    },
    locationTopRow: {
        width: "100%",
        borderBottomWidth: 1,
        borderBottomColor: colors.lightBorder,
        paddingBottom: heightPixel(12),
    },
    iconActionBtn: {
        paddingHorizontal: widthPixel(4),
    },
    saveAllButton: {
        width: "85%",
        marginTop: heightPixel(14),
    },
    modalBtn: {
        width: "42%",
        justifyContent: "center",
        alignItems: "center"
    },

    profileCardCentered: {
        alignItems: "center",
        paddingTop: heightPixel(0),
        paddingHorizontal: widthPixel(0),
    },
    avatarBorder: {
        borderRadius: heightPixel(50),
        resizeMode: "cover",
        borderWidth: heightPixel(4),
        borderColor: colors.white,
    },
    contactNameText: {
        marginTop: 6,
    },
    updateButton: {
        width: widthPixel(300),
        marginTop: heightPixel(30),
        marginBottom: heightPixel(8),
        height: heightPixel(40),
    },
    formSubtitle: {
        marginTop: 10,
    },
    saveFormButton: {
        width: "100%",
        marginTop: 14,
    },
    locationRow: {
        width: "80%",
    },
    locationAvatarImage: {
        borderRadius: heightPixel(24),
    },
    locationAddressRow: {
        marginTop: 6,
    },
    locationAddressText: {
        flex: 1,
    },
    availabilityText: {
        // marginTop: 8,
    },
    consultingFeeText: {
        marginTop: 4,
    },
    weeklyScheduleCard: {
        backgroundColor: colors.lightBlue,
        padding: heightPixel(14),
        borderRadius: heightPixel(10),
        marginVertical: heightPixel(10),
        borderWidth: 1,
        borderColor: colors.primary,
    },
    scheduleRemoveIcon: {
        alignSelf: "flex-end",
        marginBottom: heightPixel(10),
    },
    scheduleTimeDropdown: {
        width: "48%",
    },
    locationConsultationFeeRow: {
        backgroundColor: colors.lightBlue,
        paddingVertical: heightPixel(2),
        paddingHorizontal: widthPixel(10),
        borderRadius: heightPixel(6),
        marginVertical: heightPixel(10),
    },
    errorText: {
        marginTop: heightPixel(4),
    },
});

export default styles;

