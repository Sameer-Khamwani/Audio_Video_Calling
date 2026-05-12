import { useMemo, useState } from "react";
import { Linking, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import dummyImages from "../../../Assets/DummyImages";
import { icons } from "../../../Assets/Icons";
import AppWrapper from "../../../Components/AppWrapper";
import Button from "../../../Components/Button";
import CustomText from "../../../Components/CustomText";
import ImageIcons from "../../../Components/ImageIcons/Icons";
import ModalComponent from "../../../Components/Modal";
import Row from "../../../Components/Row";
import { labTests, prescription, slots } from "../../../Utils/data";
import { goBack, navigate } from "../../../Utils/navigation";
import colors from "../../../Utils/theme";
import styles from "./styles";
import BottomSheet from "../../../Components/BottomSheet";
import MonthCalendar from "../../../Components/MonthCalendar";


const AppointmentDetails = () => {
    const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
    const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

    const todayISO = useMemo(() => {
        const d = new Date();
        const yyyy = d.getFullYear();
        const mm = String(d.getMonth() + 1).padStart(2, "0");
        const dd = String(d.getDate()).padStart(2, "0");
        return `${yyyy}-${mm}-${dd}`;
    }, []);

    const [selectedDateISO, setSelectedDateISO] = useState(todayISO);
    const [visibleMonthDate, setVisibleMonthDate] = useState(() => new Date(todayISO));
    const [isCalendarExpanded, setIsCalendarExpanded] = useState(true);

    const [isSlotSelected, setIsSlotSelected] = useState<string | null>(null);
    const [isRescheduleSuccessOpen, setIsRescheduleSuccessOpen] = useState(false);

    const [selectedAppointmentType, setSelectedAppointmentType] = useState<
        "online" | "in-person"
    >("in-person");

    const [selectedSlot, setSelectedSlot] = useState<any>(null);

    const handleConfirmReschedule = () => {
        setIsBottomSheetOpen(false);
        setIsRescheduleSuccessOpen(true);
    };

    const closeRescheduleSheet = () => {
        setIsBottomSheetOpen(false);
        setIsSlotSelected(null);
        setSelectedSlot(null);
        setSelectedAppointmentType("in-person");
    };

    const setSelectedAndSyncMonth = (iso: string) => {
        setSelectedDateISO(iso);
        setVisibleMonthDate(new Date(iso));
    };
    return (
        <AppWrapper paddingHorizontal={0}>
            <KeyboardAwareScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {/* ── Patient Card ── */}
                <TouchableOpacity activeOpacity={0.8} onPress={() => navigate('PatientDetail')} style={styles.card}>
                    <Row justifyContent="space-between" alignItems="center" style={styles.patientRow}>
                        <Row gap={12} alignItems="center">
                            <ImageIcons
                                source={dummyImages.patient}
                                size={56}
                                style={styles.avatar}
                            />
                            <View>
                                <CustomText text="Sarah Jenkins" size={18} weight="bold" />
                                <CustomText
                                    text="Female, 32 yrs"
                                    size={13}
                                    weight="regular"
                                    color={colors.lightGray}
                                />
                            </View>
                        </Row>
                        <ImageIcons source={icons.greaterThan} size={16} color={colors.lightGray} />
                    </Row>
                </TouchableOpacity>

                {/* ── Schedule Info Card ── */}
                <View style={styles.card}>
                    {/* Header */}
                    <Row justifyContent="space-between" alignItems="center">
                        <CustomText text="Schedule Info" size={15} weight="semibold" />
                        <View style={styles.statusChip}>
                            <CustomText text="Pending" size={13} weight="regular" color={colors.black} />
                        </View>
                    </Row>

                    {/* Divider */}
                    <View style={styles.divider} />

                    {/* Date / time row */}
                    <Row gap={14} alignItems="center">
                        <View style={styles.iconBadge}>
                            <ImageIcons source={icons.calendar} size={22} color={colors.primary} />
                        </View>
                        <View>
                            <CustomText
                                text="Monday, October 24, 2023"
                                size={14}
                                weight="semibold"
                            />
                            <Row gap={6} style={styles.timeRow}>
                                <ImageIcons source={icons.clock} size={14} color={colors.lightGray} />
                                <CustomText
                                    text="10:30 AM - 11:00 AM (30 min)"
                                    size={13}
                                    weight="regular"
                                    color={colors.lightGray}
                                />
                            </Row>
                        </View>
                    </Row>
                </View>

                {/* ── Patient Notes Card ── */}
                <View style={styles.card}>
                    {/* Header */}
                    <Row gap={8} alignItems="center" style={styles.notesHeader}>
                        <ImageIcons source={icons.activity} size={18} color={colors.primary} />
                        <CustomText text="Patient Notes" size={15} weight="semibold" />
                    </Row>

                    {/* Note block with left accent border */}
                    <View style={styles.noteBlock}>
                        <CustomText
                            text={`"I've been experiencing mild, persistent headaches and occasional dizziness for the past 3 days. Also reported slight nausea in the mornings. Requesting a general check-up and advice on whether I need specific tests."`}
                            size={13}
                            weight="regular"
                            color={colors.gray}
                        />
                    </View>
                </View>
                <View style={styles.card}>
                    <Row justifyContent="space-between" style={styles.sectionHeaderWithBorder}>
                        <Row gap={8} >
                            <ImageIcons source={icons.prescription} size={18} color={colors.primary} />
                            <CustomText text="Prescription" size={15} weight="semibold" />
                        </Row>
                        <ImageIcons source={icons.edit} size={16} hitSlop={20} onPress={() => navigate('PrescriptionLabTests')} />
                    </Row>
                    {prescription.map((item, index) => <View key={index} style={styles.listItemRow}>
                        <CustomText text={item.name} size={14} weight="bold" style={styles.listItemTitle} />
                        <Row justifyContent="space-between">
                            <Row gap={8}>

                                <View style={[styles.timeChip, { backgroundColor: item.times.includes('Morning') ? colors.primary : colors.lightBorder }]}>
                                    <CustomText text={'Morning'} size={12} weight="regular" color={item.times.includes('Morning') ? colors.white : colors.lightText} />
                                </View>

                                <View style={[styles.timeChip, { backgroundColor: item.times.includes('Afternoon') ? colors.primary : colors.lightBorder }]}>
                                    <CustomText text={'Afternoon'} size={12} weight="regular" color={item.times.includes('Afternoon') ? colors.white : colors.lightText} />
                                </View>
                                <View style={[styles.timeChip, { backgroundColor: item.times.includes('Evening') ? colors.primary : colors.lightBorder }]}>
                                    <CustomText text={'Evening'} size={12} weight="regular" color={item.times.includes('Evening') ? colors.white : colors.lightText} />
                                </View>
                            </Row>

                            <CustomText text={`${item.dosage} · ${item.days} days`} size={12} color={colors.lightText} />
                        </Row>
                    </View>)}
                </View>
                <View style={styles.card}>
                    <Row justifyContent="space-between" alignItems="center" style={styles.sectionHeaderWithBorder}>
                        <Row gap={8} alignItems="center" >
                            <ImageIcons source={icons.labTest} size={18} />
                            <CustomText text="Lab Tests" size={15} weight="semibold" />
                        </Row>
                        <ImageIcons source={icons.edit} hitSlop={20} size={16} onPress={() => navigate('PrescriptionLabTests')} />
                    </Row>
                    <Row gap={10} style={styles.labTestsWrap}>
                        {labTests.map((item, index) => <Row key={index} gap={4}>
                            <View style={styles.bulletDot} />
                            <CustomText text={item.name} weight="bold" />
                        </Row>)}
                    </Row>
                </View>
                <Button icon={icons.prescription} iconColor={colors.white} children="Add Prescription & Lab Test" onPress={() => navigate('PrescriptionLabTests')} style={styles.addPrescriptionButton} />


                {/* ── Consultation Fee Card ── */}
                <View style={styles.card}>
                    <Row justifyContent="space-between" alignItems="center">
                        <Row gap={14} alignItems="center">
                            <ImageIcons source={icons.fee} size={45} />
                            <View>
                                <CustomText text="Consultation Fee" size={14} weight="semibold" />
                                <Row gap={8} alignItems="center" style={styles.feeRow}>
                                    <CustomText text="$150.00" size={16} weight="bold" />
                                    <View style={styles.unpaidChip}>
                                        <CustomText text="Unpaid" size={11} weight="semibold" color={colors.black} />
                                    </View>
                                </Row>
                            </View>
                        </Row>
                        <Button
                            size={12}
                            children="View Invoice"
                            onPress={() => Linking.openURL('https://www.orimi.com/pdf-test.pdf')}
                            buttonType="secondary"
                            style={styles.viewInvoiceButton}
                        />

                    </Row>
                </View>
                <View style={styles.bottomActions}>
                    <Button
                        buttonType="secondary"
                        children="Message Patient"
                        icon={icons.chat}
                        onPress={() => { navigate('ViewChat') }}
                        style={styles.actionBtn}
                        size={16}
                    />
                    <Row justifyContent="space-between">
                        <Button
                            buttonType="secondary"
                            children="Cancel"
                            onPress={() => setIsCancelModalOpen(true)}
                            style={[styles.actionBtn, styles.cancelBtn]}
                            buttontextcolor={colors.red}
                            size={16}
                        />
                        <Button
                            buttonType="secondary"
                            children="Reschedule"
                            onPress={() => setIsBottomSheetOpen(true)}
                            style={[styles.actionBtn, styles.rescheduleBtn]}
                            buttontextcolor={colors.primary}
                            size={16}
                        />
                    </Row>
                </View>
            </KeyboardAwareScrollView>


            {/* ── Cancel Appointment Modal ── */}
            <ModalComponent
                open={isCancelModalOpen}
                close={() => {
                    setIsCancelModalOpen(false)
                    goBack();
                }}
                icon={icons.modalDanger}
                header="Cancel Appointment"
                text="Are you sure you want to cancel your appointment with Dr. Sarah Ahmed on Monday, March 30 at 10:00 AM?"
                buttonStyle={styles.modalButtonWidth}
                buttons={[
                    {
                        text: "No, Keep It",
                        onPress: () => {
                            setIsCancelModalOpen(false)
                            goBack();
                        },
                        type: "secondary",
                    },
                    {
                        text: "Yes, Cancel",
                        onPress: () => {
                            setIsCancelModalOpen(false)
                            goBack();
                        },
                        type: "primary",
                        style: styles.modalDangerButton,
                    },
                ]}
            >
            </ModalComponent>

            <BottomSheet
                open={isBottomSheetOpen}
                close={closeRescheduleSheet}
            >
                <MonthCalendar
                    selectedDateISO={selectedDateISO}
                    onSelectDateISO={setSelectedAndSyncMonth}
                    visibleMonthDate={visibleMonthDate}
                    onChangeVisibleMonthDate={setVisibleMonthDate}
                    isExpanded={isCalendarExpanded}
                    onToggleExpand={() => setIsCalendarExpanded(prev => !prev)}
                    showToggleButton={false}
                />

                <CustomText
                    text="Available Time Slots"
                    size={13}
                    weight="semibold"
                    style={styles.availableSlotsTitle}
                />

                {selectedDateISO && slots.length > 0 ? (
                    <View
                        style={styles.timeSlotsWrap}
                    >
                        {slots.map((slot) => {
                            const isSelected = isSlotSelected === slot.id;

                            return (
                                <TouchableOpacity
                                    key={slot.id}
                                    activeOpacity={0.8}
                                    disabled={!slot.isAvailable}
                                    onPress={() => {
                                        setIsSlotSelected(slot.id);
                                        setSelectedSlot(slot);
                                    }}
                                    style={[
                                        styles.timeSlotTouchableBase,
                                        {
                                            backgroundColor: isSelected
                                                ? colors.lightBlue
                                                : "transparent",
                                            borderColor: isSelected
                                                ? colors.primary
                                                : colors.lightBorder,
                                            opacity: slot.isAvailable ? 1 : 0.5,
                                        },
                                    ]}
                                >
                                    <CustomText
                                        text={slot.time}
                                        size={13}
                                        weight="semibold"
                                    />
                                </TouchableOpacity>
                            );
                        })}
                    </View>
                ) : (
                    <CustomText
                        text="No time slots available for this date"
                        size={12}
                        color={colors.lightGray}
                        style={styles.listEmptyTextMuted}
                    />
                )}

                {isSlotSelected && (
                    <>
                        <CustomText
                            text="Appointment Type"
                            size={13}
                            weight="semibold"
                            style={styles.appointmentTypeTitle}
                        />

                        <Row
                            style={styles.appointmentTypeRow}
                        >
                            {/* ONLINE */}

                            <TouchableOpacity
                                activeOpacity={0.8}
                                onPress={() => setSelectedAppointmentType("online")}
                                style={[
                                    styles.appointmentTypeOptionBase,
                                    {
                                        borderColor:
                                            selectedAppointmentType === "online"
                                                ? colors.primary
                                                : colors.lightBorder,
                                        backgroundColor:
                                            selectedAppointmentType === "online"
                                                ? colors.lightBlue
                                                : "transparent",
                                    },
                                ]}
                            >
                                <ImageIcons
                                    style={styles.appointmentTypeIcon}
                                    source={icons.online}
                                    size={20}
                                    color={
                                        selectedAppointmentType === "online"
                                            ? colors.primary
                                            : colors.lightGray
                                    }
                                />

                                <CustomText
                                    text="Online"
                                    weight="bold"
                                    color={
                                        selectedAppointmentType === "online"
                                            ? colors.primary
                                            : colors.lightGray
                                    }
                                />

                                <CustomText
                                    text="Video Call"
                                    size={12}
                                    color={
                                        selectedAppointmentType === "online"
                                            ? colors.primary
                                            : colors.lightGray
                                    }
                                />
                            </TouchableOpacity>

                            {/* IN PERSON */}

                            <TouchableOpacity
                                activeOpacity={0.8}
                                onPress={() => setSelectedAppointmentType("in-person")}
                                style={[
                                    styles.appointmentTypeOptionBase,
                                    {
                                        borderColor:
                                            selectedAppointmentType === "in-person"
                                                ? colors.primary
                                                : colors.lightBorder,
                                        backgroundColor:
                                            selectedAppointmentType === "in-person"
                                                ? colors.lightBlue
                                                : "transparent",
                                    },
                                ]}
                            >
                                <ImageIcons
                                    style={styles.appointmentTypeIcon}
                                    source={icons.profile}
                                    size={20}
                                    color={
                                        selectedAppointmentType === "in-person"
                                            ? colors.primary
                                            : colors.lightGray
                                    }
                                />

                                <CustomText
                                    text="In-Person"
                                    weight="bold"
                                    color={
                                        selectedAppointmentType === "in-person"
                                            ? colors.primary
                                            : colors.lightGray
                                    }
                                />

                                <CustomText
                                    text="Clinic Visit"
                                    size={12}
                                    color={
                                        selectedAppointmentType === "in-person"
                                            ? colors.primary
                                            : colors.lightGray
                                    }
                                />
                            </TouchableOpacity>
                        </Row>
                    </>
                )}
                <Button
                    style={styles.confirmRescheduleButton}
                    icon={icons.reschedule}
                    iconColor={colors.white}
                    children="Confirm Reschedule"
                    buttonType="primary"
                    onPress={handleConfirmReschedule}
                    disabled={!isSlotSelected}
                />
            </BottomSheet>
            <ModalComponent
                open={isRescheduleSuccessOpen}
                close={() => setIsRescheduleSuccessOpen(false)}
                icon={icons.modalIcon}
                header="Reschedule Successful"
                text="Appointment has been rescheduled successfully."
                buttonStyle={styles.successModalButton}
                buttons={[
                    {
                        text: "OK",
                        onPress: () => setIsRescheduleSuccessOpen(false),
                        type: "primary",
                    },
                ]}
            />
        </AppWrapper>
    );
};

export default AppointmentDetails;
