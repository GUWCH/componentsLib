<template>
    <canvas id="canvas" class="canvas"></canvas>
</template>

<script>
export default {
    data() {
        return {}
    },
    mounted() {
        this.drawCanvas()
    },
    methods: {
        drawCanvas() {
            var canvas = document.getElementsByTagName('canvas')[0]
            var context = canvas.getContext('2d')

            // var a = context
            // var b = document.body
            // var c = canvas

            document.body.clientWidth
            var zBuffer = []
            var SIZE = 777
            canvas.width = canvas.height = SIZE
            var h = -350

            function surface(a, b, c) {
                if (c > 60) {
                    return {
                        x:
                            Math.sin(a * 7) *
                                (13 + 5 / (0.2 + Math.pow(b * 4, 4))) -
                            Math.sin(b) * 50,
                        y: b * SIZE + 50,
                        z:
                            625 +
                            Math.cos(a * 7) *
                                (13 + 5 / (0.2 + Math.pow(b * 4, 4))) +
                            b * 400,
                        r: a * 1 - b / 2,
                        g: a,
                    }
                }

                var A = a * 2 - 1
                var B = b * 2 - 1

                if (A * A + B * B < 1) {
                    if (c > 37) {
                        var j = c & 1
                        var n = j ? 6 : 4
                        var o =
                            0.5 / (a + 0.01) + Math.cos(b * 125) * 3 - a * 300
                        var w = b * h
                        return {
                            x:
                                o * Math.cos(n) +
                                w * Math.sin(n) +
                                j * 610 -
                                390,
                            y:
                                o * Math.sin(n) -
                                w * Math.cos(n) +
                                550 -
                                j * 350,
                            z: 1180 + Math.cos(B + A) * 99 - j * 300,
                            r:
                                0.4 -
                                a * 0.1 +
                                Math.pow(1 - B * B, -h * 6) * 0.15 -
                                a * b * 0.4 +
                                Math.cos(a + b) / 5 +
                                Math.pow(
                                    Math.cos(
                                        (o * (a + 1) + (B > 0 ? w : -w)) / 25
                                    ),
                                    30
                                ) *
                                    0.1 *
                                    (1 - B * B),
                            g: o / 1e3 + 0.7 - o * w * 3e-6,
                        }
                    }

                    if (c > 32) {
                        c = c * 1.16 - 0.15
                        o = a * 45 - 20
                        w = b * b * h
                        var z = o * Math.sin(c) + w * Math.cos(c) + 620
                        return {
                            x: o * Math.cos(c) - w * Math.sin(c),
                            y:
                                28 +
                                Math.cos(B * 0.5) * 99 -
                                b * b * b * 60 -
                                z / 2 -
                                h,
                            z: z,
                            r:
                                (b * b * 0.3 +
                                    Math.pow(1 - A * A, 7) * 0.15 +
                                    0.3) *
                                b,
                            g: b * 0.7,
                        }
                    }

                    o = A * (2 - b) * (80 - c * 2)
                    w =
                        99 -
                        Math.cos(A) * 120 -
                        Math.cos(b) * (-h - c * 4.9) +
                        Math.cos(Math.pow(1 - b, 7)) * 50 +
                        c * 2
                    z = o * Math.sin(c) + w * Math.cos(c) + 700
                    return {
                        x: o * Math.cos(c) - w * Math.sin(c),
                        y:
                            B * 99 -
                            Math.cos(Math.pow(b, 7)) * 50 -
                            c / 3 -
                            z / 1.35 +
                            450,
                        z: z,
                        r: (1 - b / 1.2) * 0.9 + a * 0.1,
                        g: Math.pow(1 - b, 20) / 4 + 0.05,
                    }
                }
            }

            setInterval(function() {
                for (var i = 0; i < 10000; i++) {
                    var part = i % 46
                    var c = part / 0.74
                    var point = surface(Math.random(), Math.random(), c)
                    if (point) {
                        var z = point.z
                        var x = parseInt(((point.x * SIZE) / z - h) / 2)
                        var y = parseInt(((point.y * SIZE) / z - h) / 2)
                        var zBufferIndex = y * SIZE + x
                        if (
                            typeof zBuffer[zBufferIndex] === 'undefined' ||
                            zBuffer[zBufferIndex] > z
                        ) {
                            zBuffer[zBufferIndex] = z
                            var r = -parseInt(point.r * h)
                            var g = -parseInt(point.g * h)
                            var b = -parseInt(point.r * point.r * -80)
                            context.fillStyle =
                                'rgb(' + r + ',' + g + ',' + b + ')'
                            context.fillRect(x, y, 1, 1)
                        }
                    }
                }
            }, 0)
        },
    },
}
</script>

<style lang="less" scoped>
.canvas {
    // height: 100vh;
    // width: 100vw;
}
</style>
