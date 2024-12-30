
import FileUploader from "@/components/upload-section/upload-section.tsx";

function Upload() {

    return(
        <>
            <div className="bg-[url('./assets/login-background.jpg')]
    bg-cover bg-center
    flex items-center justify-center
    min-h-screen min-w-full">
                <div className="bg-white m-6 p-6">
                    <FileUploader/>
                </div>
    <footer
        className="fixed bottom-0 left-0 w-full
    flex justify-between items-center
    p-2
    text-opacity-50"
    >
    <p className="text-xs">© Logoipsum Inc. All rights reserved</p>
    <p className="text-xs">Contact support</p>
    </footer>
    </div>
    </>

)


}
export default Upload;