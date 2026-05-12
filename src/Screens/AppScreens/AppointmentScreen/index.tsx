import React, { useMemo, useState } from "react";
import AppWrapper from "../../../Components/AppWrapper";
import CustomText from "../../../Components/CustomText";
import { FlatList, TouchableOpacity, View } from "react-native";
import Row from "../../../Components/Row";
import ImageIcons from "../../../Components/ImageIcons/Icons";
import { icons } from "../../../Assets/Icons";
import colors from "../../../Utils/theme";
import styles from "./styles";
import Button from "../../../Components/Button";
import SearchBar from "../../../Components/SearchBar";
import ModalComponent from "../../../Components/Modal";
import { navigate } from "../../../Utils/navigation";
import { AppointmentItem } from "../../../Utils/interface";
import BottomSheet from "../../../Components/BottomSheet";
import MonthCalendar from "../../../Components/MonthCalendar";
import { slots } from "../../../Utils/data";

const AppointmentScreen = () => {
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
    const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
    const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
    const [isRescheduleSuccessOpen, setIsRescheduleSuccessOpen] = useState(false);
    const [isSlotSelected, setIsSlotSelected] = useState<string | null>(null);
    const [selectedAppointmentType, setSelectedAppointmentType] = useState<"online" | "in-person">("in-person");
    const [selectedAppointment, setSelectedAppointment] = useState<AppointmentItem | null>(null);

    const appointments: AppointmentItem[] = useMemo(() => ([
        { id: "a1", name: "Sarah Jenkins", locationType: "In-Person", time: "9:00 AM", checked: true, dateISO: todayISO },
        { id: "a2", name: "Dr. Sarah Ahmed", locationType: "Video Consult", time: "10:00 AM", checked: false, dateISO: todayISO },
        { id: "a3", name: "Muhammad Ali", locationType: "In-Person", time: "1:30 PM", checked: false, dateISO: todayISO },
        { id: "a4", name: "Hira Khan", locationType: "Video Consult", time: "3:00 PM", checked: true, dateISO: todayISO },
        // another day example
        { id: "a5", name: "John Doe", locationType: "Clinic C", time: "11:00 AM", checked: false, dateISO: shiftISO(todayISO, 2) },
    ]), [todayISO]);

    const countsByDate = useMemo(() => {
        const map: Record<string, number> = {};
        for (const a of appointments) {
            map[a.dateISO] = (map[a.dateISO] ?? 0) + 1;
        }
        return map;
    }, [appointments]);

    const filteredAppointments = useMemo(
        () => appointments.filter(a => a.dateISO === selectedDateISO),
        [appointments, selectedDateISO],
    );

    const selectedDateLabel = useMemo(() => {
        const d = new Date(selectedDateISO);
        if (Number.isNaN(d.getTime())) return selectedDateISO;
        return d.toLocaleDateString(undefined, { month: "short", day: "numeric" });
    }, [selectedDateISO]);

    const setSelectedAndSyncMonth = (iso: string) => {
        setSelectedDateISO(iso);
        setVisibleMonthDate(new Date(iso));
    };

    const getClinicDotColor = (checked: boolean) => (checked ? colors.green : colors.primary);
    const handleOpenReschedule = (item: AppointmentItem) => {
        setSelectedAppointment(item);
        setIsBottomSheetOpen(true);
    };

    const closeRescheduleSheet = () => {
        setIsBottomSheetOpen(false);
        setIsSlotSelected(null);
        setSelectedAppointmentType("in-person");
    };

    const handleConfirmReschedule = () => {
        closeRescheduleSheet();
        setIsRescheduleSuccessOpen(true);
    };

    const renderAppointment = ({ item }: { item: AppointmentItem }) => (
        <TouchableOpacity activeOpacity={0.8} onPress={() => navigate('AppointmentDetails', { appointment: item })} style={styles.card}>
            <Row justifyContent="space-between" alignItems="center">
                <Row gap={20}>
                    <View style={styles.timeCol}>
                        <CustomText text={item.time.split(" ")[0]} size={14} weight="bold" />
                        <CustomText
                            text={item.time.split(" ")[1] ?? ""}
                            size={10}
                            weight="semibold"
                            color={colors.lightGray}
                        />
                    </View>
                    <View style={styles.vertDivider} />
                    <Row gap={10}>
                        <ImageIcons source={icons.profile} size={40} />
                        <View>
                            <CustomText text={item.name} weight="semibold" />
                            <Row gap={8} alignItems="center">
                                <View style={[styles.statusDot, { backgroundColor: getClinicDotColor(item.checked) }]} />
                                <Row gap={4} alignItems="center">
                                    <ImageIcons source={item.locationType === "Video Consult" ? icons.online : icons.locationPin} size={16} color={colors.lightGray} />
                                    <CustomText text={item.locationType} size={12} color={colors.lightGray} />
                                </Row>
                            </Row>
                        </View>
                    </Row>
                </Row>

                {item.checked ? (
                    <ImageIcons source={icons.circleCheck} size={20} />
                ) : (
                    <CustomText text="Pending" size={12} weight="semibold" />
                )}
            </Row>
            {item.checked ? null :
                <Row style={styles.pendingActionsRow}>
                    <Button
                        children="Cancel"
                        onPress={() => { setIsCancelModalOpen(true) }}
                        buttonType="secondary"
                        style={styles.cancelButton}
                        buttontextcolor={colors.red}
                        weight="semibold"
                    />
                    <Button
                        children="Reschedule"
                        onPress={() => handleOpenReschedule(item)}
                        buttonType="primary"
                        style={styles.cancelButton}
                        buttontextcolor={colors.white}
                        weight="semibold"
                        size={13}
                    />
                </Row>
            }
        </TouchableOpacity>
    );

    return (
        <AppWrapper paddingHorizontal={0}>
            <FlatList
                data={filteredAppointments}
                keyExtractor={(item) => item.id}
                renderItem={renderAppointment}
                ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.listContent}
                ListHeaderComponent={
                    <><>
                        {/* Calendar above status row */}
                        <MonthCalendar
                            selectedDateISO={selectedDateISO}
                            onSelectDateISO={setSelectedAndSyncMonth}
                            countsByDate={countsByDate}
                            visibleMonthDate={visibleMonthDate}
                            onChangeVisibleMonthDate={setVisibleMonthDate}
                            isExpanded={isCalendarExpanded}
                            onToggleExpand={() => setIsCalendarExpanded(prev => !prev)}
                        />

                        {/* Status row */}
                        <Row gap={16} alignItems="center" justifyContent="center" style={styles.statusRow}>
                            <Row gap={6}>
                                <View style={[styles.legendDot, { backgroundColor: colors.primary }]} />
                                <CustomText text="Upcoming" size={12} color={colors.lightGray} />
                            </Row>
                            <Row gap={6}>
                                <View style={[styles.legendDot, { backgroundColor: colors.green }]} />
                                <CustomText text="Completed" size={12} color={colors.lightGray} />
                            </Row>
                            <Row gap={6}>
                                <View style={[styles.legendDot, { backgroundColor: colors.red }]} />
                                <CustomText text="Cancelled" size={12} color={colors.lightGray} />
                            </Row>
                        </Row>

                        <Row justifyContent="space-between" alignItems="center" style={styles.headerRow}>
                            <Row gap={8}>
                                <ImageIcons source={icons.calendar} color={colors.primary} size={20} />
                                <CustomText weight="semibold" text={`Schedule for ${selectedDateLabel}`} size={14} />
                            </Row>
                            {/* <CustomText text="View Day" size={12} color={colors.primary} /> */}
                        </Row>
                    </><SearchBar
                            placeholder="Search here..."
                            onSearch={() => { }}
                            onFilterPress={() => { }}
                            filter={false}
                            rootStyle={styles.searchBarStyle} /></>
                }
                ListEmptyComponent={
                    <View style={styles.emptyState}>
                        <CustomText text="No clinics scheduled for the day." color={colors.lightGray} />
                    </View>
                }
            />
            <ModalComponent
                open={isCancelModalOpen}
                close={() => setIsCancelModalOpen(false)}
                icon={icons.modalDanger}
                header="Cancel Appointment"
                text="Are you sure you want to cancel your appointment with Dr. Sarah Ahmed on Monday, March 30 at 10:00 AM?"
                buttonStyle={styles.modalButtonStyle}
                buttons={[
                    {
                        text: "No, Keep It",
                        onPress: () => setIsCancelModalOpen(false),
                        type: "secondary",
                    },
                    {
                        text: "Yes, Cancel",
                        onPress: () => setIsCancelModalOpen(false),
                        type: "primary",
                        style: styles.modalDangerButton,
                    },
                ]}
            >
                {/* Appointment info card inside the modal */}

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
                <CustomText text="Available Time Slots" size={13} weight="semibold" style={styles.availableSlotsTitle} />
                {selectedDateISO && slots.length > 0 ? <View style={styles.timeSlotsWrap}>
                    {slots.map((slot) => (
                        <TouchableOpacity activeOpacity={0.8} onPress={() => setIsSlotSelected(slot.id)} style={[
                            styles.timeSlotTouchableBase,
                            {
                                backgroundColor: isSlotSelected === slot.id ? colors.lightBlue : "transparent",
                                borderColor: isSlotSelected === slot.id ? colors.primary : colors.lightBorder,
                                opacity: slot.isAvailable ? 1 : 0.5,
                            },
                        ]} disabled={!slot.isAvailable}>
                            <CustomText text={slot.time} size={13} weight="semibold" />
                        </TouchableOpacity>
                    ))}
                </View> : <CustomText text="No time slots available for this date" size={12} color={colors.lightGray} style={styles.listEmptyTextMuted} />}
                {isSlotSelected && <>
                    <CustomText text="Appointment Type" size={13} weight="semibold" style={styles.appointmentTypeTitle} />
                    <Row style={styles.appointmentTypeRow}>
                        <TouchableOpacity activeOpacity={0.8} onPress={() => setSelectedAppointmentType("online")} style={[
                            styles.appointmentTypeOptionBase,
                            {
                                borderColor: selectedAppointmentType === "online" ? colors.primary : colors.lightBorder,
                                backgroundColor: selectedAppointmentType === "online" ? colors.lightBlue : "transparent",
                            },
                        ]}>
                            <ImageIcons style={styles.appointmentTypeIcon} source={icons.online} size={20} color={selectedAppointmentType === "online" ? colors.primary : colors.lightGray} />
                            <CustomText text="Online" weight="bold" color={selectedAppointmentType === "online" ? colors.primary : colors.lightGray} />
                            <CustomText text="Video Call" size={12} color={selectedAppointmentType === "online" ? colors.primary : colors.lightGray} />
                        </TouchableOpacity>

                        <TouchableOpacity activeOpacity={0.8} onPress={() => setSelectedAppointmentType("in-person")} style={[
                            styles.appointmentTypeOptionBase,
                            {
                                borderColor: selectedAppointmentType === "in-person" ? colors.primary : colors.lightBorder,
                                backgroundColor: selectedAppointmentType === "in-person" ? colors.lightBlue : "transparent",
                            },
                        ]}>
                            <ImageIcons style={styles.appointmentTypeIcon} source={icons.profile} size={20} color={selectedAppointmentType === "in-person" ? colors.primary : colors.lightGray} />
                            <CustomText text="In-Person" weight="bold" color={selectedAppointmentType === "in-person" ? colors.primary : colors.lightGray} />
                            <CustomText text="Clinic Visit" size={12} color={selectedAppointmentType === "in-person" ? colors.primary : colors.lightGray} />
                        </TouchableOpacity>
                    </Row>
                </>}
                <Button
                    style={styles.rescheduleConfirmButton}
                    icon={icons.reschedule}
                    iconColor={colors.white}
                    children="Confirm Reschedule"
                    buttonType="primary"
                    onPress={handleConfirmReschedule}
                    disabled={!isSlotSelected || !selectedAppointment}
                />
            </BottomSheet>
            <ModalComponent
                open={isRescheduleSuccessOpen}
                close={() => setIsRescheduleSuccessOpen(false)}
                icon={icons.modalIcon}
                header="Reschedule Successful"
                text={`Appointment with ${selectedAppointment?.name ?? "patient"} has been rescheduled successfully.`}
                buttonStyle={styles.modalButtonStyle}
                buttons={[
                    {
                        text: "OK",
                        onPress: () => setIsRescheduleSuccessOpen(false),
                        type: "primary",
                    },
                ]}
            />
        </AppWrapper>

    )
}

export default AppointmentScreen;

const shiftISO = (iso: string, days: number) => {
    const d = new Date(iso);
    d.setDate(d.getDate() + days);
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
};

