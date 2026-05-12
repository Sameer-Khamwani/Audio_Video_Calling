import { useMemo, useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native";
import { useRoute } from "@react-navigation/native";
import { getIn, useFormik } from "formik";
import * as Yup from "yup";
import AppWrapper from "../../../Components/AppWrapper";
import CustomText from "../../../Components/CustomText";
import Row from "../../../Components/Row";
import ImageIcons from "../../../Components/ImageIcons/Icons";
import { icons } from "../../../Assets/Icons";
import { colors } from "../../../Utils/theme";
import CustomTextInput from "../../../Components/CustomTextInput";
import Counter from "../../../Components/Counter";
import Button from "../../../Components/Button";
import ModalComponent from "../../../Components/Modal";
import { goBack } from "../../../Utils/navigation";
import styles from "./styles";
import { PrescriptionItem, PrescriptionRouteParams, PrescriptionFormValues } from "../../../Utils/interface";
import { DoseTime } from "../../../Utils/interface";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";


const createPrescriptionItem = (id: number): PrescriptionItem => ({
    id,
    medicineName: "",
    dose: 1,
    duration: 1,
    whenToTake: ["Morning", "Afternoon"],
});

const prescriptionValidationSchema = Yup.object({
    prescriptions: Yup.array().of(
        Yup.object({
            medicineName: Yup.string().trim().required("Medicine name is required"),
            dose: Yup.number().min(1, "Dose must be at least 1").required("Dose is required"),
            duration: Yup.number().min(1, "Duration must be at least 1").required("Duration is required"),
            whenToTake: Yup.array()
                .of(Yup.mixed<DoseTime>().oneOf(["Morning", "Afternoon", "Evening"]))
                .min(1, "Select at least one time"),
        })
    ),
});

const PrescriptionLabTests = () => {
    const route = useRoute();
    const { prescriptions: previousPrescriptions, labTests: previousLabTests } = (route.params || {}) as PrescriptionRouteParams;

    const initialPrescriptions = useMemo(() => {
        if (previousPrescriptions?.length) {
            return previousPrescriptions.map((item, index) => ({
                id: item.id ?? index + 1,
                medicineName: item.medicineName ?? "",
                dose: item.dose ?? 1,
                duration: item.duration ?? 1,
                whenToTake: item.whenToTake?.length ? item.whenToTake : (["Morning"] as DoseTime[]),
            }));
        }
        return [createPrescriptionItem(1)];
    }, [previousPrescriptions]);

    const initialLabTests = useMemo(() => {
        if (previousLabTests?.length) {
            return previousLabTests.map((item, index) => ({
                id: item.id ?? index + 1,
                testName: item.testName ?? "",
            }));
        }
        return [{ id: 1, testName: "" }];
    }, [previousLabTests]);

    const [labTests, setLabTests] = useState(initialLabTests);
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
    const [savedPrescriptionIds, setSavedPrescriptionIds] = useState<number[]>([]);

    const formik = useFormik<PrescriptionFormValues>({
        initialValues: {
            prescriptions: initialPrescriptions,
        },
        validationSchema: prescriptionValidationSchema,
        onSubmit: () => { },
    });

    const updatePrescription = (id: number, updates: Partial<PrescriptionItem>) => {
        const nextPrescriptions = formik.values.prescriptions.map((item) =>
            item.id === id ? { ...item, ...updates } : item
        );
        formik.setFieldValue("prescriptions", nextPrescriptions);
        setSavedPrescriptionIds((prev) => prev.filter((savedId) => savedId !== id));
    };

    const toggleDoseTime = (id: number, value: DoseTime) => {
        const nextPrescriptions = formik.values.prescriptions.map((item) => {
            if (item.id !== id) return item;
            const hasValue = item.whenToTake.includes(value);
            return {
                ...item,
                whenToTake: hasValue
                    ? item.whenToTake.filter((dose) => dose !== value) as DoseTime[]
                    : [...item.whenToTake, value],
            };
        });
        formik.setFieldValue("prescriptions", nextPrescriptions);
        setSavedPrescriptionIds((prev) => prev.filter((savedId) => savedId !== id));
    };

    const addPrescription = () => {
        const nextPrescriptions = [...formik.values.prescriptions, createPrescriptionItem(Date.now())];
        formik.setFieldValue("prescriptions", nextPrescriptions);
    };

    const removePrescription = (id: number) => {
        // if (formik.values.prescriptions.length === 1) return;
        formik.setFieldValue(
            "prescriptions",
            formik.values.prescriptions.filter((item) => item.id !== id)
        );
        setSavedPrescriptionIds((prev) => prev.filter((savedId) => savedId !== id));
    };

    const addLabTest = () => {
        setLabTests((prev) => [...prev, { id: Date.now(), testName: "" }]);
    };

    const updateLabTest = (id: number, testName: string) => {
        setLabTests((prev) =>
            prev.map((item) => (item.id === id ? { ...item, testName } : item))
        );
    };

    const removeLabTest = (id: number) => {
        setLabTests((prev) => {
            // if (prev.length === 1) return prev;
            return prev.filter((item) => item.id !== id);
        });
    };

    const savePrescription = async (index: number) => {
        formik.setFieldTouched(`prescriptions[${index}].medicineName`, true, false);
        formik.setFieldTouched(`prescriptions[${index}].whenToTake`, true, false);
        formik.setFieldTouched(`prescriptions[${index}].dose`, true, false);
        formik.setFieldTouched(`prescriptions[${index}].duration`, true, false);

        const errors = await formik.validateForm();
        const prescriptionErrors = getIn(errors, `prescriptions[${index}]`);
        if (prescriptionErrors) return;

        const currentPrescription = formik.values.prescriptions[index];
        if (currentPrescription) {
            setSavedPrescriptionIds((prev) =>
                prev.includes(currentPrescription.id) ? prev : [...prev, currentPrescription.id]
            );
        }
    };

    const saveAll = async () => {
        formik.setTouched({
            prescriptions: formik.values.prescriptions.map(() => ({
                medicineName: true,
                whenToTake: true,
                dose: true,
                duration: true,
            })),
        });

        const errors = await formik.validateForm();
        if (errors?.prescriptions) return;
        setIsSuccessModalOpen(true);
    };

    return (
        <AppWrapper style={styles.appWrapper}>
            <KeyboardAwareScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={styles.keyboardScrollContent} showsVerticalScrollIndicator={false}>
                <Row gap={10} style={styles.sectionHeader}>
                    <ImageIcons source={icons.prescription} size={20} />
                    <CustomText text="Add Prescription" size={16} weight="bold" />
                </Row>
                {formik.values.prescriptions.map((item, index) => (
                    <View key={item.id} style={styles.cardContainer}>
                        <Row justifyContent="space-between" alignItems="center" style={styles.cardTopRow}>
                            <CustomTextInput
                                placeholder="Enter Medicine Name"
                                value={item.medicineName}
                                onChangeText={(text) => updatePrescription(item.id, { medicineName: text })}
                                error={getIn(formik.touched, `prescriptions[${index}].medicineName`) ? getIn(formik.errors, `prescriptions[${index}].medicineName`) : ""}
                                containerStyle={styles.medicineInput}
                            />
                            <ImageIcons source={icons.cardCross} size={26} onPress={() => removePrescription(item.id)} />
                        </Row>
                        <Row gap={10} justifyContent="space-between" alignItems="center" style={styles.whenToTakeRow}>
                            <CustomText text="When to take" size={12} color={colors.lightText} />
                            <Row gap={10}>
                                <TouchableOpacity
                                    onPress={() => toggleDoseTime(item.id, 'Morning')}
                                    style={[
                                        styles.chip,
                                        { backgroundColor: item.whenToTake.includes('Morning') ? colors.primary : colors.lightBorder }
                                    ]}>
                                    <CustomText text={'Morning'} size={12} weight="semibold" color={item.whenToTake.includes('Morning') ? colors.white : colors.lightText} />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => toggleDoseTime(item.id, 'Afternoon')}
                                    style={[
                                        styles.chip,
                                        { backgroundColor: item.whenToTake.includes('Afternoon') ? colors.primary : colors.lightBorder }
                                    ]}>
                                    <CustomText text={'Afternoon'} size={12} weight="semibold" color={item.whenToTake.includes('Afternoon') ? colors.white : colors.lightText} />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => toggleDoseTime(item.id, 'Evening')}
                                    style={[
                                        styles.chip,
                                        { backgroundColor: item.whenToTake.includes('Evening') ? colors.primary : colors.lightBorder }
                                    ]}>
                                    <CustomText text={'Evening'} size={12} weight="semibold" color={item.whenToTake.includes('Evening') ? colors.white : colors.lightText} />
                                </TouchableOpacity>
                            </Row>
                        </Row>
                        <Row justifyContent="space-between" alignItems="center" style={styles.countersRow}>
                            <View>
                                <CustomText text="Dose" size={12} color={colors.lightText} />
                                <Counter
                                    value={item.dose}
                                    onDecrement={() => updatePrescription(item.id, { dose: Math.max(1, item.dose - 1) })}
                                    onIncrement={() => updatePrescription(item.id, { dose: item.dose + 1 })}
                                    minValue={1}
                                />
                            </View>
                            <View>
                                <CustomText text="Duration" size={12} color={colors.lightText} />
                                <Counter
                                    value={item.duration}
                                    onDecrement={() => updatePrescription(item.id, { duration: Math.max(1, item.duration - 1) })}
                                    onIncrement={() => updatePrescription(item.id, { duration: item.duration + 1 })}
                                    minValue={1}
                                />
                            </View>
                        </Row>
                        <Row justifyContent="space-between" alignItems="center" style={styles.summaryRow}>
                            <CustomText
                                text={`${item.dose} tablet. ${item.whenToTake.join(', ') || 'No time selected'}. ${item.duration} ${item.duration > 1 ? 'days' : 'day'}`}
                                size={12}
                                color={colors.lightText}
                            />
                            <Button
                                children={savedPrescriptionIds.includes(item.id) ? "Saved" : "Save"}
                                buttonType="secondary"
                                onPress={() => savePrescription(index)}
                                style={styles.perPrescriptionSaveButton}
                            />
                        </Row>
                        {getIn(formik.touched, `prescriptions[${index}].whenToTake`) && getIn(formik.errors, `prescriptions[${index}].whenToTake`) ? (
                            <CustomText text={getIn(formik.errors, `prescriptions[${index}].whenToTake`)} size={12} color={colors.red} style={styles.whenToTakeError} />
                        ) : null}
                        <Row justifyContent="space-between" style={styles.countersErrorRow}>
                            {getIn(formik.touched, `prescriptions[${index}].dose`) && getIn(formik.errors, `prescriptions[${index}].dose`) ? (
                                <CustomText text={getIn(formik.errors, `prescriptions[${index}].dose`)} size={12} color={colors.red} />
                            ) : <View />}
                            {getIn(formik.touched, `prescriptions[${index}].duration`) && getIn(formik.errors, `prescriptions[${index}].duration`) ? (
                                <CustomText text={getIn(formik.errors, `prescriptions[${index}].duration`)} size={12} color={colors.red} />
                            ) : null}
                        </Row>
                    </View>
                ))}
                <Button
                    buttontextcolor={colors.primary}
                    iconColor={colors.primary}
                    children='Add Another Medicine'
                    iconSize={24}
                    icon={icons.addIcon}
                    buttonType="secondary"
                    onPress={addPrescription}
                    style={styles.addMedicineButton}
                />
                <Row gap={10}>
                    <ImageIcons source={icons.labTest} size={20} />
                    <CustomText text="Add Lab Test" size={16} weight="bold" />
                </Row>
                {labTests.map((item) => (
                    <CustomTextInput
                        key={item.id}
                        rightIcon={icons.cardCross}
                        onPressRightIcon={() => {
                            removeLabTest(item.id);
                            return {};
                        }}
                        value={item.testName}
                        onChangeText={(text) => updateLabTest(item.id, text)}
                        placeholder="Enter Lab Test Name"
                        containerStyle={styles.labTestInput}
                    />
                ))}
                <Button
                    buttontextcolor={colors.green}
                    iconColor={colors.green}
                    children='Add Another Test'
                    iconSize={24}
                    icon={icons.addIcon}
                    buttonType="secondary"
                    onPress={addLabTest}
                    style={styles.addLabTestButton}
                />
                <View style={styles.divider} />

                <Button icon={icons.tick} children='Save Prescription & Lab Test' iconSize={14} onPress={saveAll} style={styles.saveAllButton} />
            </KeyboardAwareScrollView>
            <ModalComponent
                open={isSuccessModalOpen}
                close={() => {
                    setIsSuccessModalOpen(false);
                    goBack();
                }}
                icon={icons.modalIcon}
                header="Saved Successfully"
                text="Prescription and lab tests updated successfully."
                buttonStyle={styles.successModalButton}
                buttons={[
                    {
                        text: "OK",
                        onPress: () => {
                            setIsSuccessModalOpen(false);
                            goBack();
                        },
                        type: "primary",
                    },
                ]}
            />
        </AppWrapper>
    )
}

export default PrescriptionLabTests;