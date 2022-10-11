import { StatusBar, Text, View } from "react-native";

import { TailwindProvider } from "tailwindcss-react-native";
import NativeStackNav from "./route/NativeStackNav";
import { store } from "./store";
import { Provider } from "react-redux";

export default function App() {
  return (
    <Provider store={store}>
      <TailwindProvider>
        <StatusBar backgroundColor={"white"} barStyle="dark-content" />

        <NativeStackNav />
      </TailwindProvider>
    </Provider>
  );
}
