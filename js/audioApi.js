import "../css/style.scss";

window.onload = function () {

    var file = document.getElementById("file");
    var audio = document.getElementById("audio");

    file.onchange = function () {
        //part1: 画布
        var canvas = document.getElementById("canvas");
        var context = canvas.getContext("2d");

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        var WIDTH = canvas.width;
        var HEIGHT = canvas.height;

        //part2: 音频
        var files = this.files;//声音文件
        audio.src = URL.createObjectURL(files[0]);
        audio.load();

        //part3: 分析器
        var AudCtx = new AudioContext();//音频内容
        var src = AudCtx.createMediaElementSource(audio);
        var analyser = AudCtx.createAnalyser();

        src.connect(analyser);
        analyser.connect(AudCtx.destination);
        analyser.fftSize = 256;//快速傅里叶变换, 必须为2的N次方

        var bufferLength = analyser.frequencyBinCount;// = fftSize * 0.5

        //part4: 变量
        var barWidth = (WIDTH / bufferLength) - 1;//间隔1px
        var barHeight;

        var dataArray = new Uint8Array(bufferLength);//8位无符号定长数组

        //part5: 动态监听
        function renderFrame() {
            requestAnimationFrame(renderFrame);//方法renderFrame托管到定时器，无限循环调度，频率<16.6ms/次

            context.fillStyle = "#000";//黑色背景
            context.fillRect(0, 0, WIDTH, HEIGHT);//画布拓展全屏,动态调整

            analyser.getByteFrequencyData(dataArray);//获取当前时刻的音频数据

            //part6: 绘画声压条
            var x = 0;
            for (var i = 0; i < bufferLength; i++) {
                var data = dataArray[i];//int,0~255

                var percentV = data / 255;//纵向比例
                var percentH = i / bufferLength;//横向比例

                barHeight = HEIGHT * percentV/2;

                //gbk,0~255
                var r = 255 * percentV;//值越大越红
                var g = 255 * percentH;//越靠右越绿
                var b = 50;

                context.fillStyle = "white";
                context.fillRect(x, HEIGHT - barHeight, barWidth, barHeight);

                x += barWidth + 1;//间隔1px
            }
        }

        renderFrame();

        //part7: 播放声音
        audio.play();
    };
};








