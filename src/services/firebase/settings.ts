import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import { AppReduxStore } from "../../store";
import { getSiteSettingsSuccessAction, getSiteSettingsErrorAction } from "../../store/reducers/slice/getsettings";
import { addAlert } from "../../ui/components/alert/push.alert";
declare global {
    interface Window {
        VITE_APP_TITLE: string | undefined;
    }
}
const getSiteSettings = async () => {
    try {
        const q = collection(db, "website_settings");
        const querySnapshot = await getDocs(q);
        const fetchPromises = querySnapshot.docs.map(async (doc: any) => {
            const data_ = doc.data();
            AppReduxStore.dispatch(getSiteSettingsSuccessAction(data_));
            const current_theme = data_.themes.filter((item_: any) => item_.current === true)[0];
            document.documentElement.style.setProperty('--primary-dark', current_theme.colors.primary);
            document.documentElement.style.setProperty('--secondary-dark', current_theme.colors.secondary);
            document.documentElement.style.setProperty('--light-dark', current_theme.colors.shade1);
            document.documentElement.style.setProperty('--secondary-light', current_theme.colors.shade2);
            document.documentElement.style.setProperty('--primary-light', current_theme.colors.shade2);
            window.VITE_APP_TITLE = data_.name;
        });
        await Promise.all(fetchPromises);

    } catch {
        console.log("Not able to save settings")
        AppReduxStore.dispatch(getSiteSettingsErrorAction());
        addAlert("danger", "Error Occurred while Saving the changes.");
    }
}

export { getSiteSettings };


