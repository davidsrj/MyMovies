import './global.css';
import { LogBox } from 'react-native';
import { AppProvider } from './src/app/AppProvider';

LogBox.ignoreLogs(['SafeAreaView has been deprecated']);

export default function App() {
  return <AppProvider />;
}
