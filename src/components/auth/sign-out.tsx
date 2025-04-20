import { signOut } from "@/auth";
import SlideUpButton from "../SlideUpButton";

export function SignOut() {
    return (
        <form
            action={async () => {
                "use server";
                await signOut();
            }}
        >
            <button type="submit">
                <SlideUpButton>Sign Out</SlideUpButton>
            </button>
        </form>
    );
}
