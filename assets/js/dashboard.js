function GraficoBarra(selector, value, maxValue, color, label, title) {
    const percentage = (value / maxValue) * 100;

    const options = {
        series: [{
            data: [percentage]
        }],
        chart: {
            height: 200,
            type: 'bar',
            stacked: true,
            sparkline: {
                enabled: true
            }
        },
        plotOptions: {
            bar: {
                horizontal: true,
                barHeight: '20%',
                colors: {
                    backgroundBarColors: ['#40475D']
                }
            }
        },
        colors: [color],
        stroke: {
            width: 0
        },
        title: {
            floating: true,
            offsetX: -10,
            offsetY: 5,
            text: title
        },
        subtitle: {
            floating: true,
            align: 'right',
            offsetY: 0,
            text: `${value} / ${maxValue}`,
            style: {
                fontSize: '12px'
            }
        },
        tooltip: {
            enabled: false
        },
        xaxis: {
            categories: [label]
        },
        yaxis: {
            max: 100
        },
        fill: {
            opacity: 1
        }
    };

    const chart = new ApexCharts(document.querySelector(selector), options);
    chart.render();
}

//----------------------------------------------------------------------------------------------------------------

function GraficoCircular(selector, value, maxValue, color, label, unity) {
    const percentage = (value / maxValue) * 100;

    const options = {
        series: [percentage],
        chart: {
            height: 250,
            type: 'radialBar',
        },
        plotOptions: {
            radialBar: {
                hollow: {
                    margin: 5,
                    size: '50%',
                },
                dataLabels: {
                    name: {
                        show: false,
                    },
                    value: {
                        show: true,
                        color: '#EEEEEE',
                        offsetY: 105,
                        fontSize: '25px',
                        formatter: function(val) {
                            return value + unity;
                        }
                    }
                }
            }
        },
        fill: {
            colors: [color]
        },
        stroke: {
            lineCap: 'round'
        },
        labels: [label],
    };

    const chart = new ApexCharts(document.querySelector(selector), options);
    chart.render();
}

//----------------------------------------------------------------------------------------------------------------

function GraficoCircularSVG(selector, value, maxValue, color, label, svgIcon, unity) {
    const percentage = (value / maxValue) * 100;

    const options = {
        series: [percentage],
        chart: {
            height: 300,
            type: 'radialBar',
        },
        plotOptions: {
            radialBar: {
                hollow: {
                    margin: 2,
                    size: '55%',
                    image: svgIcon,
                    imageWidth: 36,
                    imageHeight: 36,
                    imageClipped: false
                },
                dataLabels: {
                    name: {
                        show: false,
                    },
                    value: {
                        show: true,
                        color: '#EEEEEE',
                        offsetY: 70,
                        fontSize: '1.2rem',
                        formatter: function(val) {
                            return value + unity;
                        }
                    }
                }
            }
        },
        fill: {
            colors: [color]
        },
        stroke: {
            lineCap: 'round'
        },
        labels: [label],
    };

    const chart = new ApexCharts(document.querySelector(selector), options);
    chart.render();
}

//----------------------------------------------------------------------------------------------------------------

function MiniGraficoCircularSVG(selector, value, maxValue, color, label, svgIcon, unity) {
    const percentage = (value / maxValue) * 100;

    const options = {
        series: [percentage],
        chart: {
            height: 175,
            type: 'radialBar',
        },
        plotOptions: {
            radialBar: {
                hollow: {
                    margin: 3,
                    size: '50%',
                    image: svgIcon,
                    imageWidth: 20,
                    imageHeight: 20,
                    imageClipped: false
                },
                dataLabels: {
                    name: {
                        show: false,
                    },
                    value: {
                        show: true,
                        color: '#EEEEEE',
                        offsetY: 35,
                        fontSize: '1.05rem',
                        margin: '0px',
                        formatter: function(val) {
                            return value + unity;
                        }
                    }
                }
            }
        },
        fill: {
            colors: [color]
        },
        stroke: {
            lineCap: 'round'
        },
        labels: [label],
    };

    const chart = new ApexCharts(document.querySelector(selector), options);
    chart.render();
}

//----------------------------------------------------------------------------------------------------------------

const IconeChuva = '/assets/SVG/Chuva.svg';
const IconeRadiacaoSolar = '/assets/SVG/RadiacaoSolar.svg';
const IconeSensacaoTermica = '/assets/SVG/SensacaoTermica.svg';
const IconeTemperaturaMinima = '/assets/SVG/TermometroMinima.svg';
const IconeTemperaturaMedia = '/assets/SVG/TermometroMedia.svg';
const IconeTemperaturaMaxima = '/assets/SVG/TermometroMaxima.svg';
const IconePontoDeOrvalhoMinimo = '/assets/SVG/PontoDeOrvalhoMinimo.svg';
const IconePontoDeOrvalhoMedio = '/assets/SVG/PontoDeOrvalhoMedio.svg';
const IconePontoDeOrvalhoMaximo = '/assets/SVG/PontoDeOrvalhoMaximo.svg';
const IconePressaoAtomsfericaMinima = '/assets/SVG/PressaoMinima.svg';
const IconePressaoAtomsfericaMedia = '/assets/SVG/PressaoMedia.svg';
const IconePressaoAtomsfericaMaxima = '/assets/SVG/PressaoMaxima.svg';
const IconeUmidadeMinima = '/assets/SVG/UmidadeMinima.svg';
const IconeUmidadeMedia = '/assets/SVG/UmidadeMedia.svg';
const IconeUmidadeMaxima = '/assets/SVG/UmidadeMaxima.svg';
const IconeDirecaoVento = '/assets/SVG/Bussola.svg';
const IconeVento = '/assets/SVG/Vento.svg';
const IconeVentoRajada = '/assets/SVG/VentoForte.svg';

//----------------------------------------------------------------------------------------------------------------

let Estacao = "";
let Data = "";
let Hora = "";

function coletarDados() {
    Estacao = document.getElementById("nome").value;
    Data = document.getElementById("data").value;
    Hora = document.getElementById("hora").value;
}

document.getElementById("nome").onchange = coletarDados;
document.getElementById("data").onchange = coletarDados;
document.getElementById("hora").onchange = coletarDados;

let CorGraficos = 'rgb(255,0,160)';


let Fonte;
let ChuvaTotal, TemperaturaMinimaAbsoluta, TemperaturaMaximaAbsoluta, PressaoMediaAbsoluta, UmidadeMediaAbsoluta, VentoMedio;
let Chuva, RadiacaoSolar, TemperaturaMinima, TemperaturaMedia, TemperaturaMaxima, TemperaturaPontoDeOrvalhoMinima, TemperaturaPontoDeOrvalhoMedia, TemperaturaPontoDeOrvalhoMaxima, PressaoMinima, PressaoMedia, PressaoMaxima, UmidadeMinima, UmidadeMedia, UmidadeMaxima, DirecaoVento, Vento, VentoRajada, SensacaoTermica;


// Busca os dados desejados na tabela de historico
fetch('http://localhost:3000/api/historico')
.then(response => response.json())
.then(data => console.log('Dados do histórico:', data))
.catch(error => console.error('Erro:', error));

// Busca os dados desejados na tabela de previsao
fetch('http://localhost:3000/api/previsao')
.then(response => response.json())
.then(data => console.log('Dados da previsão:', data))
.catch(error => console.error('Erro:', error));


// Procura as linhas correspondentes ao dia escolhido pelo usuário nas tabelas de "Historico" e "Previsao" com base na estação meteorológica selecionada
// Conta o número de linahs coletadas em cada uma dessas tabelas
let NumeroLinhasDiaPrevisao = 24;
let NumeroLinhasDiaHistorico = 24;

// Descobre, com base no número de linhas coletadas de cada uma das tabelas, se os dados serão exibidos com base na coleta ou na previsão
if (NumeroLinhasDiaHistorico == 24){
    Fonte = 'Medição'

    // Coleta os valores de todas as linhas do dia da tabela "Historico" para realizar os cálculos sobre as médias diárias
    ChuvaTotal = 22;
    TemperaturaMinimaAbsoluta = 11;
    TemperaturaMaximaAbsoluta = 24;
    PressaoMediaAbsoluta = 732;
    UmidadeMediaAbsoluta = 77;
    VentoMedio = 8.5;

    // Coleta os valores específicos da hora desejada pela tabela "Historico"
    Chuva = 6;
    RadiacaoSolar = 600;
    TemperaturaMinima = 12;
    TemperaturaMedia = 15;
    TemperaturaMaxima = 21;
    TemperaturaPontoDeOrvalhoMinima = 2;
    TemperaturaPontoDeOrvalhoMedia = 3;
    TemperaturaPontoDeOrvalhoMaxima = 4;
    PressaoMinima = 650;
    PressaoMedia = 720;
    PressaoMaxima = 831;
    UmidadeMinima = 73;
    UmidadeMedia = 75;
    UmidadeMaxima = 76;
    DirecaoVento = 192;
    Vento = 7;
    VentoRajada = 11;
    SensacaoTermica = 24;
}
else{
    /*
    
    */

    // Coleta os valores de todas as linhas do dia da tabela "Previsao" para realizar os cálculos sobre as médias diárias
    ChuvaTotal = 22;
    TemperaturaMinimaAbsoluta = 11;
    TemperaturaMaximaAbsoluta = 24;
    PressaoMediaAbsoluta = 732;
    UmidadeMediaAbsoluta = 77;
    VentoMedio = 8.5;

    // Descobre se pelo menos os valores da hora escolhida pelo usuário já foram coletados
    /*
    if(Hora in LinhasDiaHistorico){
        Fonte = 'Medição'

        // Coleta os valores específicos da hora desejada pela tabela "Historico"
        Chuva = 6;
        RadiacaoSolar = 600;
        TemperaturaMinima = 12;
        TemperaturaMedia = 15;
        TemperaturaMaxima = 21;
        TemperaturaPontoDeOrvalhoMinima = 2;
        TemperaturaPontoDeOrvalhoMedia = 3;
        TemperaturaPontoDeOrvalhoMaxima = 4;
        PressaoMinima = 650;
        PressaoMedia = 720;
        PressaoMaxima = 831;
        UmidadeMinima = 73;
        UmidadeMedia = 75;
        UmidadeMaxima = 76;
        DirecaoVento = 192;
        Vento = 7;
        VentoRajada = 11;
        SensacaoTermica = 24;
    }
    else if( Hora in LinhasDiaPrevisao){
        Fonte = 'Previsão'

        // Coleta os valores específicos da hora desejada pela tabela "Previsao"
        Chuva = 6;
        RadiacaoSolar = 600;
        TemperaturaMinima = 12;
        TemperaturaMedia = 15;
        TemperaturaMaxima = 21;
        TemperaturaPontoDeOrvalhoMinima = 2;
        TemperaturaPontoDeOrvalhoMedia = 3;
        TemperaturaPontoDeOrvalhoMaxima = 4;
        PressaoMinima = 650;
        PressaoMedia = 720;
        PressaoMaxima = 831;
        UmidadeMinima = 73;
        UmidadeMedia = 75;
        UmidadeMaxima = 76;
        DirecaoVento = 192;
        Vento = 7;
        VentoRajada = 11;
        SensacaoTermica = 24;
    }
    else{
        // O valor desejado encontra-se indisponível no sistema
    }*/
}

//----------------------------------------------------------------------------------------------------------------

MiniGraficoCircularSVG('#InfoPluviometria', ChuvaTotal, 50, CorGraficos, 'Pluviometria', IconeChuva, ' mm');
MiniGraficoCircularSVG('#InfoTemperaturaMinima', TemperaturaMinimaAbsoluta, 50, CorGraficos, 'Temperatura Minima', IconeTemperaturaMinima, ' °C');
MiniGraficoCircularSVG('#InfoTemperaturaMaxima', TemperaturaMaximaAbsoluta, 50, CorGraficos, 'Temperatura Maxima', IconeTemperaturaMaxima, ' °C');
MiniGraficoCircularSVG('#InfoPressaoAtmosferica', PressaoMediaAbsoluta, 1000, CorGraficos, 'Pressao Atmosferica', IconePressaoAtomsfericaMedia, ' mB');
MiniGraficoCircularSVG('#InfoUmidade', UmidadeMediaAbsoluta, 100, CorGraficos, 'Umidade', IconeUmidadeMedia, ' %');
MiniGraficoCircularSVG('#InfoVento', VentoMedio, 40, CorGraficos, 'Vento', IconeVento, ' m/s');

GraficoCircularSVG('#GraficoChuva', Chuva, 30, CorGraficos, 'Chuva', IconeChuva, ' mm');
GraficoCircularSVG('#GraficoRadiacaoSolar', RadiacaoSolar, 1000, CorGraficos, 'Radiacao Solar', IconeRadiacaoSolar, ' Kj');
GraficoCircularSVG('#GraficoSensacaoTermica', SensacaoTermica, 50, CorGraficos, 'Sensacao Termica', IconeSensacaoTermica, ' °C');
GraficoCircularSVG('#GraficoTemperaturaMinima', TemperaturaMinima, 50, CorGraficos, 'Temperatura Minima', IconeTemperaturaMinima, ' °C');
GraficoCircularSVG('#GraficoTemperaturaMedia', TemperaturaMedia, 50, CorGraficos, 'Temperatura Media', IconeTemperaturaMedia, ' °C');
GraficoCircularSVG('#GraficoTemperaturaMaxima', TemperaturaMaxima, 50, CorGraficos, 'Temperatura Maxima', IconeTemperaturaMaxima, ' °C');
GraficoCircularSVG('#GraficoPontoDeOrvalhoMinimo', TemperaturaPontoDeOrvalhoMinima, 20, CorGraficos, 'Temperatura do Ponto de Orvalho Minima', IconePontoDeOrvalhoMinimo, ' °C');
GraficoCircularSVG('#GraficoPontoDeOrvalhoMedio', TemperaturaPontoDeOrvalhoMedia, 20, CorGraficos, 'Temperatura do Ponto de Orvalho Media', IconePontoDeOrvalhoMedio, ' °C');
GraficoCircularSVG('#GraficoPontoDeOrvalhoMaximo', TemperaturaPontoDeOrvalhoMaxima, 20, CorGraficos, 'Temperatura do Ponto de Orvalho Maxima', IconePontoDeOrvalhoMaximo, ' °C');
GraficoCircularSVG('#GraficoPressaoMinima', PressaoMinima, 1000, CorGraficos, 'Pressao Atmosferica Minima', IconePressaoAtomsfericaMinima, ' mB');
GraficoCircularSVG('#GraficoPressaoMedia', PressaoMedia, 1000, CorGraficos, 'Pressao Atmosferica Media', IconePressaoAtomsfericaMedia, ' mB');
GraficoCircularSVG('#GraficoPressaoMaxima', PressaoMaxima, 1000, CorGraficos, 'Pressao Atmosferica Maxima', IconePressaoAtomsfericaMaxima, ' mB');
GraficoCircularSVG('#GraficoUmidadeDoArMinima', UmidadeMinima, 100, CorGraficos, 'Umidade do Ar Minima', IconeUmidadeMinima, ' %');
GraficoCircularSVG('#GraficoUmidadeDoArMedia', UmidadeMedia, 100, CorGraficos, 'Umidade do Ar Media', IconeUmidadeMedia, ' %');
GraficoCircularSVG('#GraficoUmidadeDoArMaxima', UmidadeMaxima, 100, CorGraficos, 'Umidade do Ar Maxima', IconeUmidadeMinima, ' %');
GraficoCircularSVG('#GraficoDirecaoVento', DirecaoVento, 360, CorGraficos, 'Direcao do Vento', IconeDirecaoVento, '°');
GraficoCircularSVG('#GraficoVelocidadeVento', Vento, 30, CorGraficos, 'Velocidade do Vento', IconeVento, ' m/s');
GraficoCircularSVG('#GraficoVelocidadeRajadaVento', VentoRajada, 30, CorGraficos, 'Velocidade de Rajada do Vento', IconeVentoRajada, ' m/s');

//----------------------------------------------------------------------------------------------------------------

const EstacaoHTML = document.getElementById("NumeroEstacao");
const DiaHTML = document.getElementById("Dia");
const HoraHTML = document.getElementById("Hora");
const FonteHTML = document.getElementById("Fonte");

EstacaoHTML.textContent = Estacao;
DiaHTML.textContent = 'Dia ' + Data;
HoraHTML.textContent = 'Hora: ' + Hora;
FonteHTML.textContent = 'Fonte dos dados: ' + Fonte;