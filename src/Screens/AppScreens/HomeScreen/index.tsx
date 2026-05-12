import React, { useMemo, useState } from "react";
import { FlatList, ScrollView, TouchableOpacity, View } from "react-native";
import dummyImages from "../../../Assets/DummyImages";
import { icons } from "../../../Assets/Icons";
import AppWrapper from "../../../Components/AppWrapper";
import Button from "../../../Components/Button";
import CustomText from "../../../Components/CustomText";
import ImageIcons from "../../../Components/ImageIcons/Icons";
import ModalComponent from "../../../Components/Modal";
import Row from "../../../Components/Row";
import MonthCalendar from "../../../Components/MonthCalendar";
import { scheduleData, slots } from "../../../Utils/data";
import { AppointmentItem, ScheduleItem } from "../../../Utils/interface";
import { navigate } from "../../../Utils/navigation";
import { colors } from "../../../Utils/theme";
import styles from "./styles";
import BottomSheet from "../../../Components/BottomSheet";

const scheduleActionFlex = (
    mode: ScheduleItem["mode"],
    role: "cancel" | "reschedule" | "start",
) => {
    if (role === "start") return 1.35;
    if (mode === "online") return role === "cancel" ? 1 : 1.15;
    return 1;
};

const HomeScreen = () => {
    const todayISO = useMemo(() => {
        const d = new Date();
        const yyyy = d.getFullYear();
        const mm = String(d.getMonth() + 1).padStart(2, "0");
        const dd = String(d.getDate()).padStart(2, "0");
        return `${yyyy}-${mm}-${dd}`;
    }, []);
    const [appointments, setAppointments] = useState<ScheduleItem[]>(scheduleData);
    const [isCancelConfirmOpen, setIsCancelConfirmOpen] = useState(false);
    const [selectedDateISO, setSelectedDateISO] = useState(todayISO);
    const [visibleMonthDate, setVisibleMonthDate] = useState(() => new Date(todayISO));
    const [isCalendarExpanded, setIsCalendarExpanded] = useState(true);
    const [filterAppointments, setFilterAppointments] = useState('today')
    const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
    const [isRescheduleSuccessOpen, setIsRescheduleSuccessOpen] = useState(false);
    const [isSlotSelected, setIsSlotSelected] = useState<string | null>(null);
    const [selectedAppointmentType, setSelectedAppointmentType] = useState<"online" | "in-person">("in-person");
    const [selectedAppointment, setSelectedAppointment] = useState<AppointmentItem | null>(null);


    const filteredAppointments = useMemo(() => {
        if (filterAppointments === 'today') {
            return appointments;
        }
        return appointments.filter(a => a.status === filterAppointments);
    }, [appointments, filterAppointments]);

    console.log("filteredAppointments", filteredAppointments);




    const openCancelConfirm = (item: ScheduleItem) => {
        setSelectedAppointment(item);
        setIsCancelConfirmOpen(true);
    };

    const closeCancelConfirm = () => {
        setIsCancelConfirmOpen(false);
        setSelectedAppointment(null);
    };

    const confirmCancel = () => {
        if (!selectedAppointment) return;
        setAppointments(prev =>
            prev.map(a =>
                a.id === selectedAppointment.id ? { ...a, status: "cancelled" } : a,
            ),
        );
        closeCancelConfirm();
    };

    const handleOpenReschedule = (item: AppointmentItem) => {
        setSelectedAppointment(item);

        setSelectedAppointmentType(
            item.mode === "online" ? "online" : "in-person"
        );

        if (item.dateISO) {
            setSelectedDateISO(item.dateISO);
            setVisibleMonthDate(new Date(item.dateISO));
        }

        setIsBottomSheetOpen(true);
    };

    const closeRescheduleSheet = () => {
        setIsBottomSheetOpen(false);

        setTimeout(() => {
            setIsSlotSelected(null);
            setSelectedAppointmentType("in-person");
            setSelectedAppointment(null);
        }, 200);
    };

    const handleConfirmReschedule = () => {
        if (!selectedAppointment || !isSlotSelected) return;

        const selectedSlot = slots.find(slot => slot.id === isSlotSelected);

        setAppointments(prev =>
            prev.map(appointment =>
                appointment.id === selectedAppointment.id
                    ? {
                        ...appointment,
                        time: selectedSlot?.time ?? appointment.time,
                        dateISO: selectedDateISO,
                        dateLabel: new Date(selectedDateISO).toLocaleDateString(
                            undefined,
                            {
                                weekday: "long",
                                month: "long",
                                day: "numeric",
                            }
                        ),
                        mode:
                            selectedAppointmentType === "online"
                                ? "online"
                                : "in-person",
                    }
                    : appointment
            )
        );

        closeRescheduleSheet();

        setTimeout(() => {
            setIsRescheduleSuccessOpen(true);
        }, 250);
    };
    const getDoctorLabel = (name: string) => {
        const trimmed = name.trim();
        return /^dr\./i.test(trimmed) ? trimmed : `Dr. ${trimmed}`;
    };

    const getStatusStyles = (status: ScheduleItem["status"]) => {
        switch (status) {
            case "cancelled":
                return { label: "Cancelled", color: colors.red, lightColor: colors.lightRed };
            case "completed":
                return { label: "Completed", color: colors.green, lightColor: colors.lightGreen };
            case "upcoming":
            default:
                return { label: "Upcoming", color: colors.blue, lightColor: colors.lightBlue };
        }
    };

    const selectedDateLabel = useMemo(() => {
        const d = new Date(selectedDateISO);
        if (Number.isNaN(d.getTime())) return selectedDateISO;
        return d.toLocaleDateString(undefined, { month: "short", day: "numeric" });
    }, [selectedDateISO]);

    const setSelectedAndSyncMonth = (iso: string) => {
        setSelectedDateISO(iso);
        setVisibleMonthDate(new Date(iso));
    };  

    const renderScheduleItem = ({ item }: { item: ScheduleItem }) => (
        (() => {
            const s = getStatusStyles(item.status);
            return (
                <TouchableOpacity activeOpacity={0.8} style={styles.scheduleCard} onPress={() => navigate('AppointmentDetails', { appointment: item })}>
                    <Row style={styles.scheduleTopRow} justifyContent="space-between" alignItems="center">
                        <Row gap={18}>
                            <ImageIcons source={dummyImages.patient} size={60} style={styles.scheduleAvatar} />
                            <View>
                                <Row justifyContent="space-between" alignItems="center" style={styles.scheduleNameTimeRow}>
                                    <CustomText text={item.name} size={16} weight="semibold" />
                                    {/* <CustomText text={item.time} weight="bold" /> */}
                                    <Row style={[styles.statusBadge, { backgroundColor: s.lightColor }]}>
                                        <ImageIcons source={icons.activity} size={16} color={s.color} />
                                        <CustomText text={s.label} size={12} color={s.color} />
                                    </Row>

                                </Row>
                                {/* <CustomText text={item.details} size={12} weight="regular" /> */}
                                <Row gap={10} style={styles.scheduleMetaRow} justifyContent="space-between">
                                    <Row gap={6}>
                                        <ImageIcons source={icons.checkup} size={14} color={colors.lightGray} />
                                        <CustomText text={'General Checkup'} size={13} color={colors.lightGray} />
                                    </Row>
                                    {item?.status === 'upcoming' && <Row style={[styles.statusBadge, { backgroundColor: item.mode === 'in-person' ? s.lightColor : colors.lightGreen }]}>
                                        <ImageIcons source={item.mode === "in-person" ? icons.checkup : icons.online} size={16} color={item.mode === "in-person" ? s.color : colors.green} />
                                        <CustomText text={item.mode === "in-person" ? "In-Person" : "Online"} size={12} color={item.mode === "in-person" ? s.color : colors.green} />
                                    </Row>}
                                </Row>
                                <Row justifyContent="space-between" alignItems="center" style={styles.scheduleBottomRow}>
                                    <Row gap={6}>
                                        <ImageIcons source={icons.clock} size={14} color={colors.lightGray} />
                                        <CustomText text={item.time} size={13} weight="regular" color={colors.lightGray} />
                                    </Row>
                                    <ImageIcons source={icons.greaterThan} size={14} color={colors.lightGray} />
                                </Row>
                            </View>
                        </Row>
                        {/* <CustomText text={item.status} size={12} weight="semibold" /> */}
                    </Row>

                    <View style={styles.scheduleDivider} />
                    {item.status === "upcoming" && (
                        <Row gap={6} style={styles.scheduleActionsRow}>
                            <Button
                                size={11}
                                children="Cancel"
                                buttontextcolor={colors.white}
                                buttonType="secondary"
                                style={[
                                    styles.scheduleActionButton,
                                    styles.declineButton,
                                    { flex: scheduleActionFlex(item.mode, "cancel") },
                                ]}
                                onPress={() => openCancelConfirm(item)}
                            />
                            <Button
                                size={11}
                                children="Re-Schedule"
                                buttonType="primary"
                                style={[
                                    styles.scheduleActionButton,
                                    {
                                        backgroundColor: colors.blue,
                                        flex: scheduleActionFlex(item.mode, "reschedule"),
                                    },
                                ]}
                                onPress={() => handleOpenReschedule(item)}
                            />
                            {item.mode === "online" && (
                                <Button
                                    size={11}
                                    // icon={icons.online}
                                    iconColor={colors.white}
                                    children="Start Appointment"
                                    buttonType="primary"
                                    style={[
                                        styles.scheduleActionButton,
                                        {
                                            backgroundColor: colors.green,
                                            flex: scheduleActionFlex(item.mode, "start"),
                                        },
                                    ]}
                                    onPress={() => navigate("ReSchedule", { appointment: item })}
                                />
                            )}
                        </Row>
                    )}
                </TouchableOpacity>
            );
        })()
    );

    return (
        <AppWrapper paddingHorizontal={0}>
            <CustomText text="Good Morning, Dr. Jenkins " size={24} weight="bold" style={styles.greetingText} />
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.homeScrollContent}
            >
                <Row style={styles.dateRow}>
                    <ImageIcons source={icons.calendar} size={20} color={colors.lightGray} />
                    <CustomText text="Tuesday, Mar 24" size={13} color={colors.lightGray} />
                </Row>
                <Row style={styles.filterAppointmentsRow}>
                    <TouchableOpacity activeOpacity={0.8} onPress={() => setFilterAppointments('today')} style={[
                        styles.filterAppointmentCardBase,
                        {
                            backgroundColor: filterAppointments === 'today' ? colors.lightPrimary : colors.white,
                            borderColor: filterAppointments === 'today' ? colors.primary : colors.white,
                            elevation: filterAppointments === 'today' ? 0 : 4,
                        },
                    ]}>
                        <ImageIcons source={icons.todaysAppointment} size={40} />
                        <CustomText text="20" weight="bold" size={20} color={colors.black} />
                        <CustomText text="Today's Appointments" size={12} color={colors.lightGray} style={styles.filterStatLabel} />
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.8} onPress={() => setFilterAppointments('upcoming')} style={[
                        styles.filterAppointmentCardBase,
                        {
                            backgroundColor: filterAppointments === 'upcoming' ? colors.lightGreen : colors.white,
                            borderColor: filterAppointments === 'upcoming' ? colors.green : colors.white,
                            elevation: filterAppointments === 'upcoming' ? 0 : 4,
                        },
                    ]}>
                        <ImageIcons source={icons.upcomingAppointments} size={40} />
                        <CustomText text="10" weight="bold" size={20} color={colors.black} />
                        <CustomText text="Upcoming Appointments" size={12} color={colors.lightGray} style={styles.filterStatLabel} />
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.8} onPress={() => setFilterAppointments('cancelled')} style={[
                        styles.filterAppointmentCardBase,
                        {
                            backgroundColor: filterAppointments === 'cancelled' ? colors.lightRed : colors.white,
                            borderColor: filterAppointments === 'cancelled' ? colors.red : colors.white,
                            elevation: filterAppointments === 'cancelled' ? 0 : 4,
                        },
                    ]}>
                        <ImageIcons source={icons.cancelledAppointments} size={40} />
                        <CustomText text="04" weight="bold" size={20} color={colors.black} />
                        <CustomText text="Cancelled Appointments" size={12} color={colors.lightGray} style={styles.filterStatLabel} />
                    </TouchableOpacity>
                </Row>

                <Row onPress={() => navigate('AnalyticsScreen')} style={styles.financialReportsRow}>
                    <Row gap={12} alignItems="center">
                        <ImageIcons source={icons.dollarSign} size={32} color={colors.white} />
                        <View>
                            <CustomText text="Financial Reports" weight="bold" color={colors.white} />
                            <CustomText text="Daily . Monthly . Yearly Earnings" size={12} color={colors.white} />
                        </View>
                    </Row>
                    <ImageIcons source={icons.greaterThan} size={16} color={colors.white} />

                </Row>

                <Row style={styles.scheduleHeaderRow} justifyContent="space-between" alignItems="center">
                    <CustomText text="Today's Appointments" size={18} weight="semibold" />
                    <CustomText text="See All" size={15} color={colors.primary} onPress={() => navigate(
                        'BottomTabNavigation',
                        {
                            screen: 'AppointmentNavigation',
                        }
                    )} />
                </Row>
                <FlatList
                    data={filteredAppointments}
                    keyExtractor={(item) => item.id}
                    renderItem={renderScheduleItem}
                    contentContainerStyle={styles.listContent}
                    showsVerticalScrollIndicator={false}
                    ListEmptyComponent={<CustomText text="No appointments found" size={12} color={colors.lightGray} style={styles.listEmptyTextMuted} />}
                    ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
                />
            </ScrollView>


            <ModalComponent
                open={isCancelConfirmOpen}
                close={closeCancelConfirm}
                icon={icons.modalDanger}
                header="Cancel Appointment"
                text={
                    selectedAppointment
                        ? `Are you sure you want to cancel your appointment with ${getDoctorLabel(selectedAppointment.name)} on ${selectedAppointment.dateLabel} at ${selectedAppointment.time}`
                        : "Are you sure you want to cancel this appointment?"
                }
                buttonStyle={styles.confirmModalButton}
            >
                <Row style={styles.confirmModalButton}>
                    <Button
                        children="No, Keep It"
                        buttonType="secondary"
                        onPress={closeCancelConfirm}
                        style={styles.modalKeepButton}
                    />
                    <Button
                        children="Yes, Cancel"
                        buttonType="primary"
                        onPress={confirmCancel}
                        style={styles.modalCancelButton}
                    />
                </Row>
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
                                backgroundColor:
                                    isSlotSelected === slot.id
                                        ? colors.lightBlue
                                        : colors.white,
                                borderColor: isSlotSelected === slot.id ? colors.primary : colors.lightBorder,
                                opacity: slot.isAvailable ? 1 : 0.5,
                                transform: [
                                    {
                                        scale: isSlotSelected === slot.id ? 1.03 : 1,
                                    },
                                ],
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
                    icon={icons.reschedule}
                    iconColor={colors.white}
                    children="Confirm Reschedule"
                    buttonType="primary"
                    onPress={handleConfirmReschedule}
                    style={[
                        styles.rescheduleConfirmButton,
                        {
                            opacity:
                                !isSlotSelected || !selectedAppointment
                                    ? 0.6
                                    : 1,
                        },
                    ]}
                />
            </BottomSheet>
            <ModalComponent
                open={isRescheduleSuccessOpen}
                close={() => setIsRescheduleSuccessOpen(false)}
                icon={icons.modalIcon}
                header="Reschedule Successful"
                text={`Appointment with ${selectedAppointment?.name ?? "patient"} has been rescheduled successfully.`}
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
    )
}

export default HomeScreen;
