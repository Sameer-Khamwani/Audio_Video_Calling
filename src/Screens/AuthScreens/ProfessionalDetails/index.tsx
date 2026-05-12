import AppWrapper from "../../../Components/AppWrapper";
import CustomText from "../../../Components/CustomText";
import Row from "../../../Components/Row";
import { widthPixel } from "../../../Utils/helper";
import { heightPixel } from "../../../Utils/helper";
import colors from "../../../Utils/theme";
import { View } from "react-native";
import CustomDropDown from "../../../Components/CustomDropDown";
import CustomTextInput from "../../../Components/CustomTextInput";
import Button from "../../../Components/Button";
import { medicalSpecialization } from "../../../Utils/data";
import { ScrollView } from "react-native";
import { Formik } from "formik";
import { styles } from './styles';
import { professionalDetailsValidationSchema, professionalDetailsInitialValues } from "../../../Utils/validation";

const ProfessionalDetails = () => {
    const onSubmit = (values: typeof professionalDetailsInitialValues) => {
        console.log("Professional details submitted:", values);
    };
    return (
        <Formik
            initialValues={professionalDetailsInitialValues}
            validationSchema={professionalDetailsValidationSchema}
            onSubmit={onSubmit}
        >
            {({ handleChange, handleSubmit, values, errors, touched, setFieldValue, setFieldTouched }) => (
        <AppWrapper paddingHorizontal={0} style={styles.appWrapperStyle}>
            <ScrollView
                style={styles.scrollViewStyle}
                contentContainerStyle={styles.scrollViewContent}
                showsVerticalScrollIndicator={false}
            >
                <Row gap={widthPixel(12)} style={styles.stepRow}>
                    <CustomText text="Step 2 of 3" />
                    <View style={styles.progressBarBackground} >
                        <View style={styles.progressBarFilled} />
                    </View>
                </Row>

                <CustomText text="Tell us about your practice" size={24} weight="bold" />
                <CustomText
                    text="These details help us verify your professional standing and match you with relevant patients."
                    size={16}
                />

                <View style={styles.cardContainer}>

                    <CustomDropDown
                                name="specialization"
                        label="Medical Specialization"
                        placeholder="Select your primary specialty"
                        items={medicalSpecialization}
                        mode="FLATLIST"
                                value={values.specialization ? values.specialization : null}
                        onChangeValue={(value) => {
                                    setFieldTouched("specialization", true);
                                    setFieldValue("specialization", value);
                        }}
                    />

                    <CustomTextInput
                        label="Years of Experience"
                        placeholder="e.g. 10"
                                keyboardType="numeric"
                                value={values.yearsExperience}
                                onChangeText={handleChange("yearsExperience")}
                                error={touched.yearsExperience && errors.yearsExperience ? errors.yearsExperience : undefined}
                    />

                    <CustomTextInput
                        label="Medical License Number"
                        placeholder="Enter your PMDC / License ID"
                                value={values.licenseNumber}
                                onChangeText={handleChange("licenseNumber")}
                                error={touched.licenseNumber && errors.licenseNumber ? errors.licenseNumber : undefined}
                    />
                    <CustomText
                        text="This will be cross-referenced with official medical registries."
                        size={12}
                        color={colors.gray}
                        style={styles.licenseInfoTextStyle}
                    />

                    <CustomTextInput
                        label="Primary Clinic/Hospital Name"
                        placeholder="Where do you currently practice?"
                                value={values.clinicName}
                                onChangeText={handleChange("clinicName")}
                                error={touched.clinicName && errors.clinicName ? errors.clinicName : undefined}
                    />
                </View>

                <View style={styles.infoBoxContainer}>

                    <CustomText text="Verification Requirement" weight="semibold" />
                    <CustomText size={12} text="In the next step, you will be required to upload photos of your Medical License and National ID for identity confirmation." />


                </View>


                <Button
                    children="Continue"
                    style={styles.continueButtonStyle}
                            onPress={handleSubmit as any}
                />
                <Button
                    children="Back"
                    buttonType="secondary"
                    style={styles.backButtonStyle}
                    onPress={() => { }}
                />
            </ScrollView>
        </AppWrapper>
            )}
        </Formik>
    )
}

export default ProfessionalDetails;