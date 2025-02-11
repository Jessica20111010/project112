Webcam.set({
    width:350,
    height:300,
    image_format:'png',
    png_quality:90
})

camera=document.getElementById("camera")
Webcam.attach('#camera')

function take_snapshot()
{
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML='<img id="captured_image" src="'+data_uri+'">'
    })
}

console.log('ml5 version', ml5.version)
classifier=ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/AQ7xYTXAj//model.json', modelLoaded)

function modelLoaded() {
    console.log('Model has been loaded')
}
function check()
{
    img=document.getElementById('captured_image')
    classifier.classify(img, gotResult)
}
function speak(){
    var synth = window.speechSynthesis
    speak_data= "The prediction is" + prediction
    var utterThis = new SpeechSynthesisUtterance(speak_data)
    synth.speak(utterThis)
}
function gotResult(error,results)
{
    if (error) {
        console.error(error)
    } else {
        console.log(results)
        document.getElementById("result_emotion_name").innerHTML=results[0].label
        document.getElementById("result_emotion_name1").innerHTML=results[1].label
        prediction_1=results[0].label
        speak()

        if (results[0].label == "good")
        {
            document.getElementById("update_emoji").innerHTML="&#128077;"
        }

        if (results[0].label == "happy")
        {
            document.getElementById("update_emoji").innerHTML="&#9996;"
        }

        if (results[0].label == "okay")
        {
            document.getElementById("update_emoji").innerHTML="&#128076;"
        }
    } 
    
}