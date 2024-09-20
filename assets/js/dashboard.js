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

let Estacao = "MG-01";
let Data = "30/12/2022";
let Hora = "21:20:00";
let CorGraficos = 'rgb(255,0,160)';

/*
function coletarDados() {
    Estacao = document.getElementById("nome").value;
    Data = document.getElementById("data").value;
    Hora = document.getElementById("hora").value;
}

document.getElementById("nome").onchange = coletarDados;
document.getElementById("data").onchange = coletarDados;
document.getElementById("hora").onchange = coletarDados;
*/



let Fonte;
let ChuvaTotal, TemperaturaMinimaAbsoluta, TemperaturaMaximaAbsoluta, PressaoMediaAbsoluta, UmidadeMediaAbsoluta, VentoMedio;
let Chuva, RadiacaoSolar, TemperaturaMinima, TemperaturaMedia, TemperaturaMaxima, TemperaturaPontoDeOrvalhoMinima, TemperaturaPontoDeOrvalhoMedia, TemperaturaPontoDeOrvalhoMaxima, PressaoMinima, PressaoMedia, PressaoMaxima, UmidadeMinima, UmidadeMedia, UmidadeMaxima, DirecaoVento, Vento, VentoRajada, SensacaoTermica;



// Funções responsáveis por coletar os dados do banco de dados do projeto
function BuscarHoraNoHistorico() {
    return false;
}

function BuscarMediaNoHistorico() {
    return false;
}

async function BuscarHoraNaPrevisao() {
    try {
        // Busca os dados desejados na tabela de previsao
        const response = await fetch('http://localhost:5500/previsao');
        const data = await response.json();

        // Exibe todos os dados coletados no console da aplicação
        console.log('Dados da previsão:', data);

        try {
            // Filtra as linhas onde a variável Estacao é igual a "MG-01" e a variável Dia é igual a data selecionada pelo usuário
            const LinhasDesejadasPrevisao = data.filter(linha => linha.Estacao === Estacao && linha.Dia === Data);

            // Conta o número de linhas que cumprem com esses requisitos
            const NumeroLinhasDesejadasPrevisao = LinhasDesejadasPrevisao.length;
            if (NumeroLinhasDesejadasPrevisao == 24) {
                // Exibe no console o número de linhas que contém MG-01 como valor de Estacao
                console.log('Número de linhas desejdas para os valores de dia e estação definidos pelo usuário:', NumeroLinhasDesejadasPrevisao);

                // Coleta a linha que possui as informações correspondentes a hora requisitada pelo usuário
                const LinhaHoraDesejadaPrevisao = LinhasDesejadasPrevisao.filter(linha => linha.Hora === Hora);
                if (LinhaHoraDesejadaPrevisao.length === 0) {
                    console.log("A hora desejada não está disponível no banco de dados da previsao");
                    return false;
                } else {
                    // Exibe no console a linha da hora desejada pelo usuário
                    console.log('Linha da hora desejda pelo usuário:', LinhaHoraDesejadaPrevisao);
                    
                    const Linha = LinhaHoraDesejadaPrevisao[0];
                    
                    Chuva = Linha.Precipitacao_horario_total_mm.toFixed(2);
                    RadiacaoSolar = Linha.Radiacao_global.toFixed(2);
                    TemperaturaMinima = Linha.Temp_min_hora_anterior.toFixed(2);
                    TemperaturaMedia = Linha.Temp_ar.toFixed(2);
                    TemperaturaMaxima = Linha.Temp_max_hora_anterior.toFixed(2);
                    TemperaturaPontoDeOrvalhoMinima = Linha.Temp_ponto_orvalho_min_hora_anterior.toFixed(2);
                    TemperaturaPontoDeOrvalhoMedia = Linha.Temp_ponto_orvalho.toFixed(2);
                    TemperaturaPontoDeOrvalhoMaxima = Linha.Temp_ponto_orvalho_max_hora_anterior.toFixed(2);
                    PressaoMinima = Linha.PA_min_hora_anterior.toFixed(2);
                    PressaoMedia = Linha.PA_horaria_nivel_estacao.toFixed(2);
                    PressaoMaxima = Linha.PA_max_hora_anterior.toFixed(2);
                    UmidadeMinima = Linha.Umidade_relativa_ar_min_hora_anterior.toFixed(2);
                    UmidadeMedia = Linha.Umidade_relativa_do_ar.toFixed(2);
                    UmidadeMaxima = Linha.Umidade_relativa_ar_max_hora_anterior.toFixed(2);
                    DirecaoVento = Linha.Direcao_horaria_vento_partir_norte.toFixed(2);
                    Vento = Linha.Velocidade_horaria_vento.toFixed(2);
                    VentoRajada = Linha.Velocidade_rajada_vento.toFixed(2);
                    SensacaoTermica = (13.12 + (0.6215 * Linha.Temp_ar) - (11.37 * Math.pow(Linha.Velocidade_horaria_vento, 0.16)) + (0.3965 * Linha.Temp_ar * Math.pow(Linha.Velocidade_horaria_vento, 0.16))).toFixed(2);

                    return true;
                }
            } else {
                console.log("Não foi possível encontrar nenhum resultado para a colte dos dados do dia requisitado pelo usuário.");
                return false;
            }
        } catch (error) {
            console.error('Erro ao processar as informações:', error.stack);
            return false;
        }
    } catch (error) {
        console.error('Erro:', error);
        return false;
    }
}

function BuscarMediaNaPrevisao(){
    return true;
}



async function DefinirDados() {
    if (BuscarHoraNoHistorico() && BuscarMediaNoHistorico()) {
        Fonte = 'Medição';

        ChuvaTotal = 22;
        TemperaturaMinimaAbsoluta = 11;
        TemperaturaMaximaAbsoluta = 24;
        PressaoMediaAbsoluta = 732;
        UmidadeMediaAbsoluta = 77;
        VentoMedio = 8.5;

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
    else if (BuscarMediaNaPrevisao()) {
        ChuvaTotal = 22;
        TemperaturaMinimaAbsoluta = 11;
        TemperaturaMaximaAbsoluta = 24;
        PressaoMediaAbsoluta = 732;
        UmidadeMediaAbsoluta = 77;
        VentoMedio = 8.5;

        // Descobre se pelo menos os valores da hora escolhida pelo usuário já foram coletados
        if (BuscarHoraNoHistorico()) {
            Fonte = 'Medição/Previsão';

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
        else if (await BuscarHoraNaPrevisao()) {
            Fonte = 'Previsão';
        }
    } 
    else {
        Fonte = 'Error';
        alert("Os dados requisitados por você não estão disponíveis no sistema. Altere os valores selecionados na configuração do site para tentar novamente.");
    }

    console.log(Fonte);
}

//----------------------------------------------------------------------------------------------------------------

async function AtualizarExibirGraficos() {
    await DefinirDados();

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
}

AtualizarExibirGraficos()

//----------------------------------------------------------------------------------------------------------------

const EstacaoHTML = document.getElementById("NumeroEstacao");
const DiaHTML = document.getElementById("Dia");
const HoraHTML = document.getElementById("Hora");
const FonteHTML = document.getElementById("Fonte");

EstacaoHTML.textContent = Estacao;
DiaHTML.textContent = 'Dia ' + Data;
HoraHTML.textContent = 'Hora: ' + Hora;
FonteHTML.textContent = 'Fonte dos dados: ' + Fonte;