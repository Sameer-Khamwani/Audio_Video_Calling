import React, { FC, useState } from "react";
import { Image, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { Formik, useFormikContext } from "formik";
import icons from "../../../Assets/Icons";
import AppWrapper from "../../../Components/AppWrapper";
import Button from "../../../Components/Button";
import CustomText from "../../../Components/CustomText";
import CustomTextInput from "../../../Components/CustomTextInput";
import { heightPixel, widthPixel } from "../../../Utils/helper";
import colors from "../../../Utils/theme";
import Row from "../../../Components/Row";
import ImageIcons from "../../../Components/ImageIcons/Icons";
import DropDown from "../../../Components/CustomDropDown";
import { gender, medicalSpecialization } from "../../../Utils/data";
import useImagePicker from "../../../Hooks/useImagePicker";
import ModalComponent from "../../../Components/Modal";
import useDateTimePicker from "../../../Hooks/useDateTimePicker";
import { styles } from "./styles";
import { navigate } from "../../../Utils/navigation";
import { PersonalInfoFormValues, TextFieldName } from "../../../Utils/interface";
import { personalInfoValidationSchema, personalInfoInitialValues } from "../../../Utils/validation";

const fields: {
  name: TextFieldName;
  label: string;
  placeholder: string;
  keyboardType?: "default" | "email-address" | "numeric" | "phone-pad";
  leftIcon?: any;
  secureTextEntry?: boolean;
}[] = [
    {
      name: "fullName",
      label: "Full Name",
      leftIcon: icons.profile,
      placeholder: "Enter your full name",
    },
    // {
    //   name: 'specialization',
    //   leftIcon: icons.specialization,
    //   label: 'Specialization',
    //   placeholder: 'Enter your specialization',
    // },
    {
      name: "qualification",
      leftIcon: icons.qualification,
      label: "Qualification",
      placeholder: "Enter your qualification",
    },
    {
      name: "experience",
      leftIcon: icons.experience,
      label: "Experience",
      placeholder: "Enter your experience",
    }
  ];

const ProfileSetup = () => {
  const { imageUri, isPickerOpen, togglePicker, handleCamera, handleGallery } = useImagePicker();
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);

  const handleSubmit = (values: typeof personalInfoInitialValues) => {
    console.log("Personal info submitted:", values);
    setIsSuccessOpen(true);
    navigate("HomeScreen");
  };

  return (
    <Formik
      initialValues={personalInfoInitialValues}
      validationSchema={personalInfoValidationSchema}
      onSubmit={handleSubmit}>
      {({
        handleChange,
        handleSubmit,
        values,
        errors,
        touched,
        setFieldValue,
        setFieldTouched,
      }) => (
        <>
          <AppWrapper paddingHorizontal={0}>
            <ScrollView
              style={styles.scrollView}
              contentContainerStyle={styles.scrollViewContent}
              showsVerticalScrollIndicator={false}
            >
              {/* <Row gap={widthPixel(12)} style={{ marginVertical: heightPixel(22) }}>
              <CustomText text="Step 1 of 3" />
              <View style={{ flex: 1, height: heightPixel(4.5), borderRadius: heightPixel(7), backgroundColor: colors.border, }}>
                <View style={{ flex: 1, height: heightPixel(4.5), borderRadius: heightPixel(7), backgroundColor: colors.primary, width: '33.33%' }} />
              </View>
            </Row> */}
              <CustomText text="Welcome, Doctor!" size={24} weight="bold" />
              <CustomText
                style={styles.centerText}
                text="Let's set up your profile so patients can find and book appointments with you."
                size={16} />
              <View style={styles.card}>

                <TouchableOpacity
                  activeOpacity={0.85}
                  onPress={togglePicker}
                  style={styles.avatarContainer}
                >
                  {imageUri ? (
                    <Image
                      source={{ uri: imageUri }}
                      style={styles.avatar}
                    />
                  ) : (
                    <ImageIcons disabled source={icons.emptyProfile} size={100} />
                  )}
                  <ImageIcons
                    disabled
                    source={icons.camera}
                    size={40}
                    style={styles.cameraIcon}
                  />
                </TouchableOpacity>

                {fields.map(field => (
                  <CustomTextInput
                    leftIcon={field?.leftIcon}
                    key={field.name}
                    label={field.label}
                    placeholder={field.placeholder}
                    keyboardType={field.keyboardType}
                    secureTextEntry={field.secureTextEntry}
                    value={values?.[field.name]}
                    onChangeText={handleChange(field.name)}
                    error={touched[field.name] && errors[field.name]
                      ? (errors[field.name] as string)
                      : undefined} />
                ))}
                <DobField />
                <DropDown
                  multiple={true}
                  name="specialization"
                  leftIcon={icons.specialization}
                  mode="FLATLIST"
                  label="Specialization"
                  placeholder="Select your Specialization"
                  items={medicalSpecialization}
                  value={values?.specialization}
                  onChangeValue={(value) => {
                    setFieldTouched("specialization", true);
                  }}
                  style={styles.specializationDropDown}
                />
                <DropDown
                  leftIcon={icons.gender}
                  name="gender"
                  mode="FLATLIST"
                  label="Gender"
                  placeholder="Select your Gender"
                  items={gender}
                  value={values?.gender || null}
                  onChangeValue={(value) => {
                    setFieldTouched("gender", true);
                    setFieldValue("gender", value);
                  }}
                  style={styles.genderDropDown}
                />
                <Row gap={widthPixel(8)} style={styles.privacyRow}>
                  <ImageIcons source={icons.privacy} size={20} />
                  <CustomText color={colors.primary} size={12} text="Your data is protected with enterprise-grade 256-bit encryption and HIPAA-compliant servers." />

                </Row>

              </View>

              <Button
                size={18}
                children="Save"
                style={styles.saveButton}
                icon={icons.rightArrow}
                onPress={handleSubmit} />
            </ScrollView>
          </AppWrapper>
          <ModalComponent
            buttonStyle={styles.modalButton}
            open={isPickerOpen}
            close={togglePicker}
            header="Select Image"
            text="Choose a source for your profile photo."
            buttons={[
              { text: "Camera", onPress: () => { void handleCamera(); }, type: "primary" },
              { text: "Gallery", onPress: () => { void handleGallery(); }, type: "secondary" },
            ]}
          />
          <ModalComponent
            open={isSuccessOpen}
            close={() => setIsSuccessOpen(false)}
            icon={icons.modalIcon}
            header="Congratulations!"
            text="Your account is ready to use. You can now proceed to Home screen."
            buttonStyle={styles.successModalButton}
            buttons={[
              { text: "OK", onPress: () => setIsSuccessOpen(false), type: "primary" },
            ]}
          />
        </>
      )}
    </Formik>
  );
};
export default ProfileSetup;

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
      <TouchableOpacity activeOpacity={0.85} onPress={showPicker}>
        <View pointerEvents="none">
          <CustomTextInput
            label="Date of Birth"
            leftIcon={icons.calendar}
            placeholder="Select your date of birth"
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

