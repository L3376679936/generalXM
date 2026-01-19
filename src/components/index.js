import CleanForm from './cleanFrom/index.vue';
import Mess from './message/message.vue'
import FileUpload from './fileUpload/index.vue'
import Map from './map/index'
import SelectAdd from './selectAdd/index.vue'
import rightMenu from './rightMenu/index.vue'
import myText1 from './myText1/src/index.vue'
import myText2 from './myText2/src/index.vue'
import myCard from './myCard/src/index.vue'
import labVideo from './labVideo/index.vue'
import RichText from './Tinymce/index.vue'
import inputIp from './inputIp/index.vue'
import pinyinSearch from './pinyinSearch/index.vue'
export default {
    install(app) {
        app.component('CleanForm', CleanForm)
        app.component('Mess', Mess)
        app.component('FileUpload', FileUpload)
        app.component('Map', Map)
        app.component('SelectAdd', SelectAdd)
        app.component('rightMenu', rightMenu)
        app.component('myText1', myText1)
        app.component('myText2', myText2)
        app.component('myCard', myCard)
        app.component('labVideo', labVideo)
        app.component('RichText', RichText)
        app.component('inputIp', inputIp)
        app.component('pinyinSearch', pinyinSearch)
    }
}


