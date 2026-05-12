import { Formik, useFormikContext } from "formik";
import { FC, useState } from "react";
import { Image, ScrollView, TouchableOpacity, View } from "react-native";
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
import useImagePicker from "../../../Hooks/useImagePicker";
import { gender, medicalSpecialization } from "../../../Utils/data";
import { PersonalInfoFormValues } from "../../../Utils/interface";
import { goBack } from "../../../Utils/navigation";
import colors from "../../../Utils/theme";
import styles from "./styles";
import useDateTimePicker from "../../../Hooks/useDateTimePicker";
import { heightPixel, vw } from "../../../Utils/helper";
import { updateProfileValidationSchema, updateProfileInitialValues } from "../../../Utils/validation";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const UpdateProfile = () => {
    const { imageUri, isPickerOpen, togglePicker, handleCamera, handleGallery } = useImagePicker();
    const [isSuccessOpen, setIsSuccessOpen] = useState(false);

    const onSubmit = (values: typeof updateProfileInitialValues) => {
        console.log("Update profile:", values);
        setIsSuccessOpen(true);
    };

    return (
        <Formik
            initialValues={updateProfileInitialValues}
            validationSchema={updateProfileValidationSchema}
            onSubmit={onSubmit}
        >
            {({ handleChange, handleSubmit, values, errors, touched, setFieldValue, setFieldTouched }) => (
                <>
                    <AppWrapper paddingHorizontal={0}>
                        <KeyboardAwareScrollView
                            // keyboardShouldPersistTaps="handled"
                            // style={styles.scroll}
                            contentContainerStyle={styles.scrollContent}
                            showsVerticalScrollIndicator={false}
                        >
                            {/* Avatar */}
                            <TouchableOpacity activeOpacity={0.85} onPress={togglePicker} style={styles.avatarWrapper}>
                                {imageUri ? (
                                    <Image
                                        source={{ uri: imageUri }}
                                        style={styles.profileImage}
                                    />
                                ) : (
                                    <ImageIcons disabled source={dummyImages.profileImage} size={110} style={styles.placeholderImage} />
                                )}
                                <ImageIcons
                                    source={icons.camera}
                                    size={44}
                                    style={styles.cameraBadge}
                                    disabled
                                />
                                <CustomText
                                    text="Change Photo"
                                    color={colors.primary}
                                    style={styles.changePhotoText}
                                    weight="semibold"
                                />
                            </TouchableOpacity>

                            {/* Personal Details Card */}
                            <View style={[styles.card, { zIndex: 3 }]}>
                                <Row gap={8} alignItems="center" style={styles.cardHeaderRow}>
                                    <ImageIcons source={icons.profile} size={20} color={colors.primary} />
                                    <CustomText text="Personal Details" size={18} weight="semibold" />
                                </Row>

                                <CustomTextInput
                                    label="Full Name"
                                    placeholder="Enter your full name"
                                    value={values.fullName}
                                    onChangeText={handleChange("fullName")}
                                    error={touched.fullName && errors.fullName ? errors.fullName : undefined}
                                />

                                <Row style={styles.twoColumnRowWithMargin}>
                                    <View style={styles.halfInput}>
                                        {/* <CustomTextInput
                                            label="Date of Birth"
                                            placeholder="YYYY-MM-DD"
                                            value={values.dob}
                                            onChangeText={handleChange("dob")}
                                            error={touched.dob && errors.dob ? errors.dob : undefined}
                                        /> */}
                                        <DobField />

                                    </View>

                                    <View style={[styles.halfInput, { zIndex: 1 }]}>
                                        <CustomDropDown
                                            name="gender"
                                            label="Gender"
                                            placeholder="Select"
                                            items={gender}
                                            mode="FLATLIST"
                                            value={values.gender || null}
                                            onChangeValue={(value) => {
                                                setFieldTouched("gender", true);
                                                setFieldValue("gender", value);
                                            }}
                                        />
                                    </View>
                                </Row>
                            </View>


                            {/* Contact Info Card */}
                            <View style={[styles.card, { zIndex: 2 }]}>
                                <Row gap={8} alignItems="center" style={styles.cardHeaderRow}>
                                    <ImageIcons source={icons.phone} size={20} color={colors.black} />
                                    <CustomText text="Contact Info" size={18} weight="semibold" />
                                </Row>

                                <CustomTextInput
                                    leftIcon={icons.phone}
                                    label="Phone Number"
                                    placeholder="Phone Number"
                                    value={values.phoneNumber}
                                    onChangeText={handleChange("phoneNumber")}
                                    error={touched.phoneNumber && errors.phoneNumber ? errors.phoneNumber : undefined}
                                    disabled
                                />
                                <CustomTextInput
                                    leftIcon={icons.locationPin}
                                    leftIconStyle={{
                                        justifyContent: 'flex-start',
                                        marginTop: heightPixel(16),
                                    }}
                                    label="Residential Address"
                                    placeholder="Enter your address"
                                    value={values.address}
                                    onChangeText={handleChange("address")}
                                    error={touched.address && errors.address ? errors.address : undefined}
                                    multiline
                                    textInputContainerStyle={{
                                        height: heightPixel(100),
                                    }}
                                />
                                <CustomDropDown
                                    name="specializations"
                                    label="Specialization"
                                    placeholder="Select specialization"
                                    items={medicalSpecialization}
                                    mode="FLATLIST"
                                    multiple
                                    value={values.specializations}
                                    onChangeValue={(value) => {
                                        setFieldTouched("specializations", true);
                                        setFieldValue("specializations", value);
                                    }}
                                />
                                <CustomTextInput
                                    leftIcon={icons.qualification}
                                    label="Qualification"
                                    placeholder="e.g. MBBS"
                                    value={values.qualification}
                                    onChangeText={handleChange("qualification")}
                                    error={
                                        touched.qualification && errors.qualification
                                            ? errors.qualification
                                            : undefined
                                    }
                                />
                                <CustomTextInput
                                    leftIcon={icons.experience}
                                    label="Experience"
                                    placeholder="e.g. 5+ Years"
                                    value={values.experience}
                                    onChangeText={handleChange("experience")}
                                    error={touched.experience && errors.experience ? errors.experience : undefined}
                                />
                            </View>

                            <Button
                                children="Save"
                                style={styles.saveButton}
                                icon={icons.rightArrow}
                                onPress={handleSubmit as any}
                                size={18}
                            />
                        </KeyboardAwareScrollView>
                    </AppWrapper>
                    <ModalComponent
                        buttonStyle={styles.modalButton}
                        style={styles.pickerModalButtons}
                        open={isPickerOpen}
                        close={togglePicker}
                        buttons={[
                            { text: "Camera", onPress: () => { void handleCamera(); }, type: "primary" },
                            { text: "Gallery", onPress: () => { void handleGallery(); }, type: "secondary" },
                        ]}
                    />
                    <ModalComponent
                        open={isSuccessOpen}
                        close={() => {
                            setIsSuccessOpen(false);
                            goBack();
                        }}
                        icon={icons.modalIcon}
                        header="Profile Updated"
                        text="Your profile has been saved successfully."
                        buttonStyle={styles.successModalButton}
                        buttons={[
                            {
                                text: "OK", onPress: () => {
                                    setIsSuccessOpen(false)
                                    goBack();
                                }, type: "primary"
                            },
                        ]}
                    />
                </>
            )}
        </Formik>
    );
};

export default UpdateProfile;

const DobField: FC = () => {
    const { values, errors, touched, setFieldValue, setFieldTouched } =
        useFormikContext<PersonalInfoFormValues>();

    const { DatePickerModal, showPicker } = useDateTimePicker(
        values.dateOfBirth ? new Date(values.dateOfBirth) : null,
        "date",
        "YYYY-MM-DD",
        (_date, formatted) => {
            setFieldTouched("dateOfBirth", true);
            setFieldValue("dateOfBirth", formatted);
        },
        // date of birth cannot be in the future; allow up to today
        undefined,
    );

    return (
        <View>
            <TouchableOpacity activeOpacity={0.85} onPress={() => {
                showPicker();
            }}>
                <View pointerEvents="none">
                    <CustomTextInput
                        label="Date of Birth"
                        leftIcon={icons.calendar}
                        placeholder="Select"
                        value={values.dateOfBirth}
                        error={
                            touched.dateOfBirth && errors.dateOfBirth
                                ? (errors.dateOfBirth as string)
                                : undefined
                        }
                        disabled
                    />
                </View>
            </TouchableOpacity>
            {DatePickerModal}
        </View>
    );
};

