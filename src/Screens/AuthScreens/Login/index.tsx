import { ScrollView } from "react-native"
import AppWrapper from "../../../Components/AppWrapper"
import CustomText from "../../../Components/CustomText"
import CustomTextInput from "../../../Components/CustomTextInput"
import Row from "../../../Components/Row"
import CheckBox from "../../../Components/Checkbox"
import { useState } from "react"
import Button from "../../../Components/Button"
import { Formik } from "formik"
import { icons } from "../../../Assets/Icons"
import ImageIcons from "../../../Components/ImageIcons/Icons"
import { navigate } from "../../../Utils/navigation"
import { styles } from './styles'
import { loginValidationSchema, loginInitialValues } from "../../../Utils/validation";

const Login = () => {
    const [check, setCheck] = useState(false);

    const onSubmit = (values: typeof loginInitialValues) => {
        console.log("Login submit:", values, { rememberMe: check });
        navigate('DrawerNavigation');
    };
    return (
        <Formik
            initialValues={loginInitialValues}
            validationSchema={loginValidationSchema}
            onSubmit={onSubmit}
        >
            {({ handleChange, handleSubmit, values, errors, touched }) => (
                <AppWrapper>
                    <ScrollView
                        contentContainerStyle={styles.scrollViewContent}
                        showsVerticalScrollIndicator={false}
                    >
                        <ImageIcons source={icons.login} size={95} style={styles.loginIconStyle} />
                        <CustomText text="Welcome Back" size={24} weight="bold" />
                        <CustomText text="Sign in to manage your practice and patients." style={styles.subtitleStyle} />
                        <CustomTextInput
                            label="EMAIL"
                            placeholder="Enter your email"
                            keyboardType="email-address"
                            value={values.email}
                            onChangeText={handleChange("email")}
                            error={touched.email && errors.email ? errors.email : undefined}
                        />
                        <CustomTextInput
                            label="PASSWORD"
                            placeholder="Enter your password"
                            keyboardType="default"
                            secureTextEntry={true}
                            value={values.password}
                            onChangeText={handleChange("password")}
                            error={touched.password && errors.password ? errors.password : undefined}
                        />
                        <Row style={styles.rememberMeRowStyle} justifyContent="space-between">
                            <CheckBox
                                value={check}
                                onPress={() => {
                                    setCheck(!check);
                                }}
                                text="Remember Me"
                            />
                            <CustomText onPress={() => navigate('ForgotPassword')} text="Forgot Password?" weight="semibold" style={styles.forgotPasswordStyle} />

                        </Row>
                        <Button
                            size={16}
                            children="Sign In"
                            style={styles.signInButtonStyle}
                            onPress={handleSubmit as any}
                        />
                        {/* <CustomText onPress={() => { }} text="No account yet? Register Now" weight="semibold" style={{
                            textDecorationLine: 'underline',
                            textAlign: "center",
                            marginTop: heightPixel(20)
                        }} /> */}
                    </ScrollView>
                </AppWrapper>
            )}
        </Formik>
    )
}

export default Login;