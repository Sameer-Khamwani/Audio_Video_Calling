import dummyImages from "../../../Assets/DummyImages";
import OnBoarding from "../../../Components/OnBoarding";
import { navigate } from "../../../Utils/navigation";

const OnBoarding1 = () => {
    return (
        <OnBoarding
            activeDot={1}
            image={dummyImages.onBoarding1}
            title="Meet Doctors Online"
            subtitle="Connect with Specialized Doctors Online for Convenient and Comprehensive Medical Consultations."
            children="Next"
            onPress={() => navigate('OnBoarding2')}
            onPressSkip={() => navigate('Login')}
        />
    );
};



export default OnBoarding1;
