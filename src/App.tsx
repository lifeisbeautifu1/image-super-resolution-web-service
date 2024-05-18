import { Fragment } from "react";
import { Toaster } from "sonner";
import axios from "axios";

import { Navbar, FileUpload } from "./components";

axios.defaults.baseURL =
  "https://lifeisbeautifu1-web-server-for-srgan-2e6d.twc1.net";

const App = () => {
  return (
    <Fragment>
      <Toaster />
      <section className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">
        <Navbar />
        <main className="text-center w-screen h-screen flex flex-col space-y-8 justify-center items-center p-4">
          <h1 className="font-bold text-3xl">Upload low resolution image</h1>
          <FileUpload />
        </main>
      </section>
    </Fragment>
  );
};

export default App;
