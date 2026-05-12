import { Formik } from "formik";
import { useMemo, useState } from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import dummyImages from "../../../Assets/DummyImages";
import { icons } from "../../../Assets/Icons";
import AppWrapper from "../../../Components/AppWrapper";
import Button from "../../../Components/Button";
import CustomDropDown from "../../../Components/CustomDropDown";
import CustomText from "../../../Components/CustomText";
import CustomTextInput from "../../../Components/CustomTextInput";
import ImageIcons from "../../../Components/ImageIcons/Icons";
import ModalComponent from "../../../Components/Modal";
import Row from "../../../Components/Row";
import useDateTimePicker from "../../../Hooks/useDateTimePicker";
import { dayOptions, makeSchedule, profile, timeSlots } from "../../../Utils/data";
import { font, heightPixel, widthPixel } from "../../../Utils/helper";
import { LocationFee, WeeklyScheduleItem } from "../../../Utils/interface";
import { navigate } from "../../../Utils/navigation";
import colors from "../../../Utils/theme";
import { emptyLocationForm, locationSchema } from "../../../Utils/validation";
import styles from "./styles";

// ─── Component ─────────────────────────────────────────────────────────────────
const MyProfile = () => {
    const [showLocationForm, setShowLocationForm] = useState(false);
    const [editingLocationId, setEditingLocationId] = useState<string | null>(null);
    const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
    const [formInitialValues, setFormInitialValues] = useState(emptyLocationForm());

    const [locations, setLocations] = useState<LocationFee[]>([
        {
            id: "l-1",
            title: "Dr. jack Piterson",
            address: "USA. 20 Cooper Square. 21. street. Left side",
            consultationFee: "260",
            specialization: "Cardiology",
            weeklySchedule: [{ ...makeSchedule(), day: "Monday", startTime: "05:00 PM", endTime: "09:00 PM" }],
        },
        {
            id: "l-2",
            title: "Dr. jack Piterson",
            address: "47 W 13th St, New York, NY 10011, USA",
            consultationFee: "260",
            specialization: "Cardiothoracic Radiology",
            weeklySchedule: [{ ...makeSchedule(), day: "Tuesday", startTime: "10:00 PM", endTime: "11:00 PM" }],
        },
    ]);

    const [activeTimeTarget, setActiveTimeTarget] = useState<{
        rowId: string;
        field: "startTime" | "endTime";
        setFieldValue: (field: string, value: any) => void;
        schedule: WeeklyScheduleItem[];
    } | null>(null);

    const { DatePickerModal, showPicker } = useDateTimePicker(
        null,
        "time",
        "hh:mm A",
        (_date, formatted) => {
            if (!activeTimeTarget) return;
            const { rowId, field, setFieldValue, schedule } = activeTimeTarget;
            const updated = schedule.map(item =>
                item.id === rowId ? { ...item, [field]: formatted } : item,
            );
            setFieldValue("weeklySchedule", updated);
        },
    );

    const availabilityText = (loc: LocationFee) => {
        const first = loc.weeklySchedule[0];
        if (!first) return "Schedule not added";
        return `Monday ${first.startTime} - ${first.endTime}`;
    };

    const onEditLocation = (loc: LocationFee) => {
        setFormInitialValues({
            title: loc.title,
            address: loc.address,
            consultationFee: loc.consultationFee,
            specialization: loc.specialization,
            weeklySchedule: loc.weeklySchedule,
        });
        setEditingLocationId(loc.id);
        setShowLocationForm(true);
    };

    const openAddForm = () => {
        setFormInitialValues(emptyLocationForm());
        setEditingLocationId(null);
        setShowLocationForm(true);
    };

    const deleteTarget = useMemo(
        () => locations.find(x => x.id === deleteTargetId),
        [deleteTargetId, locations],
    );

    return (
        <AppWrapper paddingHorizontal={0}>
            <ScrollView
                style={styles.scroll}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {/* ── Profile Card ── */}
                <View style={[styles.card, styles.profileCardCentered]}>
                    <View style={styles.headerBanner} />
                    <View style={styles.profileCardContent}>
                        <ImageIcons
                            source={dummyImages.profileImage}
                            size={80}
                            style={[styles.avatarWrap, styles.avatarBorder]}
                            disabled
                        />
                        <CustomText text={profile.name} size={20} weight="bold" style={styles.nameText} />
                        <CustomText text={profile.designation} size={12} style={styles.subtitleText} color={colors.lightGray} />
                        <Row style={styles.contactRow} gap={widthPixel(10)}>
                            <TouchableOpacity disabled style={styles.contactBox}>
                                <ImageIcons source={icons.phone} size={20} color={colors.primary} disabled />
                                <CustomText text={profile.phone} size={12} weight="semibold" style={styles.contactNameText} />
                            </TouchableOpacity>
                            <TouchableOpacity disabled style={styles.contactBox}>
                                <ImageIcons source={icons.mail} size={20} color={colors.primary} disabled />
                                <CustomText text={profile.email} size={12} weight="semibold" style={styles.contactNameText} />
                            </TouchableOpacity>
                        </Row>
                        <Button
                            children="Update Profile"
                            onPress={() => navigate("UpdateProfile")}
                            style={styles.updateButton}
                            buttonType="secondary"
                        />
                    </View>
                </View>

                {/* ── Specializations ── */}
                <View style={styles.card}>
                    <CustomText text="Specializations" size={18} weight="semibold" style={styles.title} />
                    <View style={styles.chipsRow}>
                        {profile.specializationChips.map(chip => (
                            <View key={chip} style={styles.chip}>
                                <CustomText text={chip} color={colors.primary} size={12} />
                            </View>
                        ))}
                    </View>
                </View>

                {/* ── Add location CTA (only when no locations and form is hidden) ── */}
                {locations.length < 1 && !showLocationForm ? (
                    <Button
                        children="+ Add Location and Consultation Fee"
                        onPress={openAddForm}
                        style={styles.addButton}
                        buttontextcolor={colors.white}
                    />
                ) : null}

                {/* ── Location / Fee Form with Formik ── */}
                {showLocationForm ? (
                    <Formik
                        initialValues={formInitialValues}
                        enableReinitialize  // repopulate when editing a different location
                        validationSchema={locationSchema}
                        onSubmit={(values, { resetForm }) => {
                            if (editingLocationId) {
                                setLocations(prev =>
                                    prev.map(item =>
                                        item.id === editingLocationId
                                            ? { ...values, id: editingLocationId }
                                            : item,
                                    ),
                                );
                                setEditingLocationId(null);
                            } else {
                                setLocations(prev => [{ ...values, id: `l-${Date.now()}` }, ...prev]);
                            }
                            resetForm();
                            setShowLocationForm(false);
                        }}
                    >
                        {({ values, errors, touched, handleChange, handleBlur, setFieldValue, handleSubmit }) => (
                            <View style={styles.card}>
                                <Row justifyContent="space-between" alignItems="center">
                                    <CustomText text="Add Location and Consultation Fee" size={16} weight="semibold" />
                                    <ImageIcons
                                        source={icons.cross}
                                        onPress={() => {
                                            setEditingLocationId(null);
                                            setShowLocationForm(false);
                                        }}
                                        size={20}
                                        color={colors.black}
                                    />
                                </Row>
                                <CustomText
                                    text="Doctor Registration form"
                                    color={colors.lightGray}
                                    weight="semibold"
                                    style={styles.formSubtitle}
                                />

                                {/* Address */}
                                <CustomText text="Address" size={14} weight="semibold" style={styles.fieldLabel} />
                                <CustomTextInput
                                    value={values.address}
                                    placeholder="Enter address"
                                    onChangeText={handleChange("address")}
                                    onBlur={handleBlur("address")}
                                />
                                {touched.address && errors.address ? (
                                    <CustomText text={errors.address} size={11} color={colors.red} style={styles.errorText} />
                                ) : null}

                                {/* Fee */}
                                <CustomText text="Fee (Rs.)" size={14} weight="semibold" style={styles.fieldLabel} />
                                <CustomTextInput
                                    value={values.consultationFee}
                                    placeholder="e.g. 2500"
                                    keyboardType="numeric"
                                    onChangeText={handleChange("consultationFee")}
                                    onBlur={handleBlur("consultationFee")}
                                />
                                {touched.consultationFee && errors.consultationFee ? (
                                    <CustomText text={errors.consultationFee} size={11} color={colors.red} style={styles.errorText} />
                                ) : null}

                                {/* Schedule */}
                                <CustomText text="Schedule" size={14} weight="semibold" style={styles.fieldLabel} />
                                {values.weeklySchedule.map((item, idx) => (
                                    <View key={item.id} style={styles.weeklyScheduleCard}>
                                        {idx > 0 && <ImageIcons style={styles.scheduleRemoveIcon} source={icons.cardCross} size={24} onPress={() => setFieldValue("weeklySchedule", values.weeklySchedule.filter(s => s.id !== item.id))} />}
                                        <Row gap={8} style={styles.scheduleRow}>
                                            <View style={styles.dayPickerWrap}>
                                                <CustomDropDown
                                                    items={dayOptions}
                                                    value={item.day}
                                                    mode="MODAL"
                                                    onChangeValue={(value) => {
                                                        const updated = values.weeklySchedule.map(s =>
                                                            s.id === item.id ? { ...s, day: String(value ?? s.day) } : s,
                                                        );
                                                        setFieldValue("weeklySchedule", updated);
                                                    }}
                                                />
                                            </View>

                                            <CustomDropDown
                                                style={styles.scheduleTimeDropdown}
                                                mode="MODAL"
                                                placeholder="Select Time Slot" items={timeSlots} value={item.timeSlot} onChangeValue={(value) => setFieldValue("timeSlot", value)} />
                                            {/* Per-row schedule errors */}
                                            {touched.weeklySchedule &&
                                                Array.isArray(errors.weeklySchedule) &&
                                                (errors.weeklySchedule[idx] as any)?.day ? (
                                                <CustomText
                                                    text={(errors.weeklySchedule[idx] as any).day}
                                                    size={11}
                                                    color={colors.red}
                                                />
                                            ) : null}

                                        </Row>
                                        <Row gap={12}  >
                                            <TouchableOpacity
                                                activeOpacity={0.9}
                                                style={styles.timeInputWrap}
                                                onPress={() => {
                                                    setActiveTimeTarget({
                                                        rowId: item.id,
                                                        field: "startTime",
                                                        setFieldValue,
                                                        schedule: values.weeklySchedule,
                                                    });
                                                    showPicker();
                                                }}
                                            >
                                                <View pointerEvents="none">
                                                    <CustomTextInput
                                                        label="Start Time"
                                                        disabled
                                                        value={`${item.startTime}`}
                                                    />
                                                </View>
                                            </TouchableOpacity>
                                            <TouchableOpacity
                                                activeOpacity={0.9}
                                                style={styles.timeInputWrap}
                                                onPress={() => {
                                                    setActiveTimeTarget({
                                                        rowId: item.id,
                                                        field: "endTime",
                                                        setFieldValue,
                                                        schedule: values.weeklySchedule,
                                                    });
                                                    showPicker();
                                                }}
                                            >
                                                <View pointerEvents="none">
                                                    <CustomTextInput
                                                        label="End Time"
                                                        disabled
                                                        value={`${item.endTime}`}
                                                    />
                                                </View>
                                            </TouchableOpacity>
                                        </Row>
                                    </View>
                                ))}

                                {/* Array-level schedule error */}
                                {touched.weeklySchedule && typeof errors.weeklySchedule === "string" ? (
                                    <CustomText text={errors.weeklySchedule} size={11} color={colors.red} />
                                ) : null}

                                <TouchableOpacity
                                    style={styles.linkBtn}
                                    onPress={() =>
                                        setFieldValue("weeklySchedule", [...values.weeklySchedule, makeSchedule()])
                                    }
                                >
                                    <CustomText text="+ Add Schedule" size={15} weight="semibold" color={colors.lightGray} />
                                </TouchableOpacity>

                                <Button
                                    children={editingLocationId ? "Update Location" : "Save Details & Update Cards"}
                                    onPress={() => handleSubmit()}
                                    style={styles.saveFormButton}
                                    icon={icons.save}
                                />
                            </View>
                        )}
                    </Formik>
                ) : null}

                {/* ── Location cards ── */}
                {locations.map(loc => (
                    editingLocationId !== loc.id &&

                    <View key={loc.id} style={styles.locationItemCard}>
                        <Row justifyContent="space-between" alignItems="flex-start" style={styles.locationTopRow}>
                            <Row gap={10} style={styles.locationRow}>
                                <ImageIcons
                                    source={dummyImages.patient}
                                    size={48}
                                    style={styles.locationAvatarImage}
                                    disabled
                                />
                                <View>
                                    <CustomText text={loc.title} size={13} weight="semibold" />
                                    <CustomText text={loc.specialization} size={10} color={colors.lightGray} />

                                </View>
                            </Row>
                            <Row>
                                <TouchableOpacity style={styles.iconActionBtn} onPress={() => onEditLocation(loc)}>
                                    <ImageIcons source={icons.edit} size={18} disabled />
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.iconActionBtn} onPress={() => setDeleteTargetId(loc.id)}>
                                    <ImageIcons source={icons.delete} size={18} color={colors.red} disabled />
                                </TouchableOpacity>
                            </Row>
                        </Row>
                        <Row gap={4} style={styles.locationAddressRow}>
                            <ImageIcons source={icons.locationPin} size={14} color="#5c6470" disabled />
                            <CustomText text={loc.address} color="#5c6470" size={11} style={styles.locationAddressText} />
                        </Row>
                        {loc.weeklySchedule?.map((item, index) => (
                            <CustomText key={index} text={`${item.day} ${item.startTime} - ${item.endTime}`} color={colors.green} size={12} style={styles.availabilityText} />
                        ))}
                        <Row justifyContent="space-between" style={styles.locationConsultationFeeRow}>
                            <CustomText text="Consultation Fee" color={colors.gray} />
                            <CustomText text={`$${loc.consultationFee} `} size={16} weight="semibold" style={styles.consultingFeeText} />
                        </Row>
                    </View>
                ))}

                {locations.length > 0 ? (
                    <Button
                        children="+ Add Another Location"
                        onPress={openAddForm}
                        style={styles.addButton}
                        buttonType="secondary"
                        buttontextcolor="#3d4b63"
                    />
                ) : null}
            </ScrollView>

            {/* ── Delete modal ── */}
            <ModalComponent
                open={!!deleteTarget}
                close={() => setDeleteTargetId(null)}
                icon={icons.modalDelete}
                header="Delete Location & Fee"
                text="Are you sure you want to delete this Location & Fee?"
                buttonStyle={styles.modalBtn}
                buttons={[
                    { text: "No, Keep It", onPress: () => setDeleteTargetId(null), type: "secondary" },
                    {
                        text: "Yes, Delete",
                        style: { backgroundColor: colors.red },
                        onPress: () => {
                            if (deleteTargetId) {
                                setLocations(prev => prev.filter(item => item.id !== deleteTargetId));
                            }
                            setDeleteTargetId(null);
                        },
                        type: "primary",
                    },
                ]}
            />
            {DatePickerModal}
        </AppWrapper>
    );
};

export default MyProfile;