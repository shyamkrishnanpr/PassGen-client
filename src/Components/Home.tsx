import { useEffect, useState } from "react";
import Modal from "../MOdal/Modal";
import { InputNumber, Slider, Switch, message } from "antd";
import { savePasswordApi } from "../Services/service";


const numbers = "0123456789";
const upperCaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowerCaseLetters = "abcdefghijklmnopqrstuvwxyz";
const specialCharacters = "!@#$%^&*-_=~`|/:;,.";


const Home = () => {

    const [modalOpen, setModalOpen] = useState(false);
    const [password, setPassword] = useState<string>("");
    const [appName, setAppName] = useState<string>("");
    const [userName, setUserName] = useState<string>("");
    const [passwordLength, setPasswordLength] = useState<number>(4);
    const [includeUppercase, setIncludeUppercase] = useState<boolean>(false);
    const [includeLowercase, setIncludeLowercase] = useState<boolean>(false);
    const [includeNumbers, setIncludeNumbers] = useState<boolean>(false);
    const [includeSymbols, setIncludeSymbols] = useState<boolean>(false);

    const [generatedPassword, setGeneratedPassword] = useState<string>("");
    const [allOptionsSelected, setAllOptionsSelected] = useState<boolean>(false);
    const [passwordGenerated, setPasswordGenerated] = useState<boolean>(false);
  
    const [savedPasswordData, setSavedPasswordData] = useState<any>([]);

    useEffect(() => {
        if (
          includeUppercase ||
          includeLowercase ||
          includeNumbers ||
          includeSymbols
        ) {
          setAllOptionsSelected(true);
        } else {
          setAllOptionsSelected(false);
        }
      }, [includeUppercase, includeLowercase, includeNumbers, includeSymbols]);

    const openModal = () => {
        setModalOpen(true)
    }


    const closeModal = () => {
        setModalOpen(false);
      };

      const handleGeneratePassword = () => {
        let characterList = "";
        if (includeUppercase) {
          characterList += upperCaseLetters;
        }
        if (includeLowercase) {
          characterList += lowerCaseLetters;
        }
        if (includeNumbers) {
          characterList += numbers;
        }
        if (includeSymbols) {
          characterList += specialCharacters;
        }
        const generatedPassword = createRandomPassword(characterList);
        setPassword(generatedPassword);
        setGeneratedPassword(password);
        setPasswordGenerated(true);
      };


      
  function createRandomPassword(characterList: string): string {
    let password = "";
    let characterListLength = characterList.length;
    for (let i = 0; i < passwordLength; i++) {
      let randomIndex = Math.floor(Math.random() * characterListLength);
      password += characterList.charAt(randomIndex);
    }
    return password;
  }

  
  const onPasswordLengthChange = (value: number | null | undefined) => {
    if (value !== null && value !== undefined) {
      setPasswordLength(value);
    }
  };

  const handleSavePassword = async() =>{

    if (allOptionsSelected &&
        passwordGenerated &&
        appName.trim()!=="" &&
        userName.trim()!=="") {
        const savedData = {
            appName:appName,
            userName:userName,
            password:password
        }
        try {
             

            const response = await savePasswordApi(savedData); 
            if (response && response.data) {
                message.success("Password Created successfully.");
                closeModal()
              } else {
                message.error("Network error");
              }

            console.log(response)
        } catch (error:any) {
            message.error(error.response.data.error)
        }
    } else {
        
    }
  }


  const handleCopyClick = () => {
    if (password.length > 0) {
      navigator.clipboard.writeText(password);
      message.success("Successfully copied");
    }
  };

  return (



    <div className="mb-16 ml-2 mr-2">
      <div className="relative md:flex-row">
        <img
          src="https://cyberhound.com/wp-content/uploads/password-banner-01.png"
          alt="Image"
          className="h-full w-full object-cover"
        />

        <div className="absolute top-96 left-96 right-0 bottom-0 flex flex-col justify-center items-center md:items-start md:w-1/2 ">
          <div className="mb-4 md:mb-0 space-y-4 md:space-y-0 md:space-x-4 flex flex-col md:flex-row">
            <button className=" text-white px-6 py-3 rounded-lg hover:bg-pink-600 transition w-full md:w-auto" 
             onClick={openModal}>
              Generate Password
            </button>
          </div>
        </div>
      </div>



     

      <Modal isOpen={modalOpen} onClose={closeModal}>
        <div className="space-y-5">
          <h1 className="text-2xl font-bold">Add Password</h1>
          <div className="fixed left-1/2 top-1/2 w-80 -translate-x-1/2 -translate-y-1/2 transform rounded-md bg-white p-5 sm:w-96">
            <div className="space-y-5 bg-white ">
              <h1 className="text-2xl font-bold">Add Password</h1>
              <div className="flex justify-between">
                <input
                  className="w-full rounded-md"
                  type="text"
                  readOnly
                  value={generatedPassword}
                />
              </div>
              <div className="flex gap-3">
                <button
                  className="uppercase w-1/2 rounded-md border border-indigo-900 bg-white px-2 py-2 text-sm font-semibold text-indigo-900 sm:px-3 sm:text-base"
                  onClick={handleCopyClick}
                >
                  Copy Password
                </button>
                <button
                  className="w-1/2 rounded-md bg-indigo-500 px-2 py-2 text-sm font-semibold text-white active:bg-indigo-900 sm:px-3 sm:text-base"
                  onClick={handleGeneratePassword}
                >
                  Generate New
                </button>
              </div>
              <div>
                <label
                  htmlFor="appName"
                  className="text-sm font-medium text-gray-700"
                >
                  App Name
                </label>
                <input
                  className="w-full rounded-md border-2 border-gray-300 p-2"
                  type="text"
                  id="appName"
                  placeholder="App Name"
                  value={appName}
                  onChange={(e) => setAppName(e.target.value)}
                />
              </div>
              <div>
                <label
                  htmlFor="userName"
                  className="text-sm font-medium text-gray-700"
                >
                  User Name
                </label>
                <input
                  className="w-full rounded-md border-2 border-gray-300 p-2"
                  type="text"
                  id="userName"
                  placeholder="User Name"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <label htmlFor="length" className="font-semibold">
                    Password length
                  </label>
                </div>
                <div className="flex items-center">
                  <Slider
                    id="length-slider"
                    min={4}
                    max={20}
                    value={passwordLength}
                    onChange={onPasswordLengthChange}
                    className="w-32 mr-4"
                  />
                  <InputNumber
                    id="length-input"
                    min={4}
                    max={20}
                    value={passwordLength}
                    onChange={onPasswordLengthChange}
                    className="w-12 h-8"
                  />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <label htmlFor="uppercase" className="font-semibold">
                    Include uppercase letters
                  </label>
                </div>
                <div>
                  <Switch
                    id="uppercase-switch"
                    className="bg-gray-500"
                    checked={includeUppercase}
                    onChange={(checked) => setIncludeUppercase(checked)}
                  />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <label htmlFor="lowercase" className="font-semibold">
                    Include lowercase letters
                  </label>
                </div>
                <div>
                  <Switch
                    id="lowercase-switch"
                    className="bg-gray-500"
                    checked={includeLowercase}
                    onChange={(checked) => setIncludeLowercase(checked)}
                  />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <label htmlFor="number" className="font-semibold">
                    Include numbers
                  </label>
                </div>
                <div>
                  <Switch
                    id="number-switch"
                    className="bg-gray-500"
                    checked={includeNumbers}
                    onChange={(checked) => setIncludeNumbers(checked)}
                  />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <label htmlFor="symbol" className="font-semibold">
                    Include symbols
                  </label>
                </div>
                <div>
                  <Switch
                    id="symbol-switch"
                    className="bg-gray-500"
                    checked={includeSymbols}
                    onChange={(checked) => setIncludeSymbols(checked)}
                  />
                </div>
              </div>
              <div className="flex gap-3">
                <button
                  className="uppercase w-1/2 rounded-md border border-indigo-900 bg-white px-2 py-2 text-sm font-semibold text-indigo-900 sm:px-3 sm:text-base"
                  onClick={closeModal}
                >
                  Cancel
                </button>
                <button
                  disabled={!allOptionsSelected || !passwordGenerated}
                  className={`w-1/2 ${
                    allOptionsSelected && passwordGenerated
                      ? "bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-900 text-white"
                      : "bg-gray-400 cursor-not-allowed"
                  } rounded-md px-2 py-2 text-sm font-semibold sm:px-3 sm:text-base`}
                  onClick={() => handleSavePassword()}
                >
                  Save Password
                </button>
              </div>
            </div>
          </div>
        </div>
      </Modal>



    </div>
  );
};

export default Home;
