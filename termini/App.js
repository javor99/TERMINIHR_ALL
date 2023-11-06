import {
  
  createAppContainer
} from 'react-navigation';

import { createStackNavigator } from 'react-navigation-stack';
import EmailForm from './pages/Email'
import Start from './pages/Start'
import EnterCode from"./pages/EnterCode"
import "expo-dev-client"
import Welcome from './pages/Welcome';
import Complete from "./pages/Complete"
import Complete2 from "./pages/Complete2"
import Prijatelji from "./pages/Prijatelji"
import Termini from "./pages/Termini"
import DodajFrenda from "./pages/DodajFrenda"
import ListaFrendova from "./pages/ListaFrendova"
import Zahtjevi from "./pages/Zahtjevi"
import NapraviTermin from "./pages/NapraviTermin"
import NapraviTermin2 from "./pages/NapraviTermin2.js"
import AktivniTermini from "./pages/AktivniTermini"
import Povijest from "./pages/Povijest"
import Detalji from "./pages/Detalji"
import DetaljiPovijest from "./pages/DetaljiPovijest"
import DetaljiOrg from "./pages/DetaljiOrg"
import DetaljiSudj from "./pages/DetaljiSudj"
import Postavke from "./pages/Postavke"
import EditInfo from "./pages/EditInfo"
import EditInfo2 from "./pages/EditInfo2"
import EditOpis from "./pages/EditOpis"
import Bravo from "./pages/Bravo"
import {Provider} from 'react-redux';
import {configureStore} from '@reduxjs/toolkit';

import Home from "./pages/Home"
import React,{Component} from 'react';
import allReducer from "./redux/reducers"
 


const store=configureStore({reducer:allReducer})

 
const RootStack = createStackNavigator({
Start: {
  screen: Start,
  navigationOptions:{
    headerShown:false
  }
},
Signup: {
  screen: EmailForm,
  navigationOptions:{
    headerShown:false
  }
},
VerifyCode: {
  screen: EnterCode,
  navigationOptions:{
    headerShown:false
  }
},Welcome: {
  screen: Welcome,
  navigationOptions:{
    headerShown:false
  }
},
Complete: {
  screen: Complete,
  navigationOptions:{
    headerShown:false
  },

},
Complete2: {
  screen: Complete2,
  navigationOptions:{
    headerShown:false
  },

}
,
Home:{
  screen:Home,
  navigationOptions:{
    headerShown:false
  }
}
,
Prijatelji:{
  screen:Prijatelji,
  navigationOptions:{
    headerShown:false
  }
}
,
Termini:{
  screen:Termini,
  navigationOptions:{
    headerShown:false
  }
}
,
ListaFrendova:{
  screen:ListaFrendova,
  navigationOptions:{
    headerShown:false
  }
}
,

Zahtjevi:{
  screen:Zahtjevi,
  navigationOptions:{
    headerShown:false
  }
},

DodajFrenda:{
  screen:DodajFrenda,
  navigationOptions:{
    headerShown:false
  }
},
NapraviTermin:{
  screen:NapraviTermin,
  navigationOptions:{
    headerShown:false
  }
},
NapraviTermin2:{
  screen:NapraviTermin2,
  navigationOptions:{
    headerShown:false
  }
},
AktivniTermini:{
  screen:AktivniTermini,
  navigationOptions:{
    headerShown:false
  }
},
Povijest:{
  screen:Povijest,
  navigationOptions:{
    headerShown:false
  }
},
Detalji:{
  screen:Detalji,
  navigationOptions:{
    headerShown:false
  }
},
DetaljiPovijest:{
  screen:DetaljiPovijest,
  navigationOptions:{
    headerShown:false
  }
},
DetaljiSudj:{
  screen:DetaljiSudj,
  navigationOptions:{
    headerShown:false
  }
},
DetaljiOrg:{
  screen:DetaljiOrg,
  navigationOptions:{
    headerShown:false
  }
},
Postavke:{
  screen:Postavke,
  navigationOptions:{
    headerShown:false
  }
},
EditInfo:{
  screen:EditInfo,
  navigationOptions:{
    headerShown:false
  }
},
EditInfo2:{
  screen:EditInfo2,
  navigationOptions:{
    headerShown:false
  }
}, 
EditOpis:{
  screen:EditOpis,
  navigationOptions:{
    headerShown:false
  }
},
Bravo:{
  screen:Bravo,
  navigationOptions:{
    headerShown:false
  }
},

});


const AppContainer = createAppContainer(RootStack);



export default class App extends Component {
  render () {
    return (
        <Provider store={store}>
          <AppContainer/>
        </Provider>
    )
  }
}
