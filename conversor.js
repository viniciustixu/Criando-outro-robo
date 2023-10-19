const fs = require('fs');

function ordenarPorMelhorPrecoPorMinuto(dadosStr) {
  // Dividir a string em linhas
  const linhas = dadosStr.split('\n');

  // Inicializar uma matriz para armazenar os dados formatados
  const dados = [];

  // Processar cada linha da string
  linhas.forEach(function (linha) {
    const partes = linha.split('\t');
    if (partes.length === 4) {
      const id = parseInt(partes[0]);
      const precoStr = partes[1];
      const tempoStr = partes[3];

      // Extrair o preço e o tempo como números
      const preco = parseFloat(precoStr.replace('$', '').trim());
      const tempo = parseFloat(tempoStr.trim());

      // Calcular o preço por minuto
      const valorPorMinuto = preco / tempo;

      // Adicionar os dados formatados à matriz com o ID
      dados.push([id, preco, tempo, valorPorMinuto]);
    }
  });

  // Ordenar os dados com base no valor por minuto em ordem crescente
  dados.sort(function (a, b) {
    return a[3].toString().localeCompare(b[3].toString());
  });
  

  // Gere o HTML com os dados ordenados
  const html = gerarHTML(dados);

  // Salvar o HTML em um arquivo chamado "melhores.html"
  fs.writeFileSync('melhores.html', html);

  console.log('Arquivo "melhores.html" gerado com sucesso.');
}

function gerarHTML(dados) {
  // Crie uma string HTML com base nos dados ordenados
  let html = `
    <html>
      <head>
        <title>Dados Ordenados</title>
      </head>
      <body>
        <h1>Dados Ordenados por Melhor Preço por Minuto</h1>
        <table>
          <tr>
            <th>ID</th>
            <th>Preço</th>
            <th>Tempo</th>
            <th>Valor por Minuto</th>
          </tr>`;

  dados.forEach(function (entrada) {
    // Crie um link com o ID no lugar dos zeros na URL
    const link = `https://openloot.com/items/BT0/Hourglass_Common/issue/${entrada[0]}`;

    html += `
          <tr>
            <td><a href="${link}" target="_blank">${entrada[0]}</a></td>
            <td>${entrada[1]}</td>
            <td>${entrada[2]}</td>
            <td>${entrada[3]}</td>
          </tr>`;
  });

  html += `
        </table>
      </body>
    </html>`;

  return html;
}

const dadosStr = `


130267	$ 18	Link	0.62
282102	$ 62	Link	0.69
380585	$ 20	Link	0.91
75338	$ 16	Link	1.00
28784	$ 19.70	Link	1.96
174012	$ 16	Link	1.97
482140	$ 16	Link	2.42
100161	$ 16.50	Link	2.42
191148	$ 16	Link	2.74
221583	$ 16	Link	3.42
34319	$ 16.50	Link	4.28
103501	$ 15	Link	4.79
225400	$ 22	Link	4.96
138940	$ 22	Link	4.96
20674	$ 30	Link	5.41
112577	$ 25	Link	5.70
10760	$ 32	Link	5.97
355438	$ 15.30	Link	6.84
367942	$ 19.87	Link	6.96
37565	$ 16	Link	8.83
61373	$ 14	Link	10
342554	$ 16	Link	10
153365	$ 20	Link	10
455613	$ 20	Link	10
231190	$ 25	Link	10
312877	$ 30	Link	10
301924	$ 49	Link	10
444306	$ 53	Link	10
449625	$ 53	Link	10
269144	$ 66	Link	10
188068	$ 10,700	Link	10
86062	$ 60	Link	11.30
244368	$ 65	Link	15.98
491112	$ 21.30	Link	16.98
570142	$ 25	Link	18.08
45940	$ 14	Link	19.77
245261	$ 53	Link	20
143270	$ 13.49	Link	28.00
462091	$ 19.99	Link	29.00
461333	$ 30	Link	29.77
83847	$ 14	Link	30
226086	$ 15	Link	30
23920	$ 16	Link	30
246317	$ 16	Link	30
426803	$ 18	Link	30
239821	$ 19.90	Link	30
52305	$ 19.99	Link	30
187686	$ 20	Link	30
305173	$ 21	Link	30
128122	$ 52.70	Link	30
296007	$ 52.70	Link	30
412389	$ 65	Link	31.53
123409	$ 15	Link	32.99
103685	$ 25	Link	40
323010	$ 45	Link	40
167063	$ 53	Link	45.00
477734	$ 18	Link	45.77
312673	$ 20	Link	58.99
345268	$ 20	Link	59.98
119539	$ 16	Link	60
255854	$ 16.50	Link	60
372978	$ 18	Link	60
6274	$ 30	Link	60
398137	$ 40	Link	60
495848	$ 40	Link	60
11727	$ 49	Link	60
593623	$ 49	Link	60
410305	$ 52.70	Link	60
440878	$ 52.70	Link	60
355880	$ 53	Link	60
250560	$ 80	Link	60
132160	$ 16.84	Link	70.00
492811	$ 30	Link	74.76
93696	$ 30	Link	82.00
289570	$ 26	Link	89.99
174590	$ 20	Link	90
440050	$ 36	Link	95.12
580301	$ 58	Link	95.86
332161	$ 16.86	Link	96.00
428186	$ 20	Link	97.10
155420	$ 26	Link	97.89
374324	$ 25	Link	100.36
425081	$ 70	Link	102.00
143726	$ 52.63	Link	102.99
285991	$ 18	Link	104.00
2935	$ 20	Link	104.00
452631	$ 20	Link	107.69
371648	$ 40	Link	109.00
181892	$ 77	Link	109.91
510879	$ 30	Link	111.00
559096	$ 33	Link	113.85
417320	$ 13.99	Link	118.02
12585	$ 14	Link	120
543748	$ 19	Link	120
164145	$ 19	Link	120
408988	$ 19	Link	120
451055	$ 19.55	Link	120
8634	$ 19.55	Link	120
251192	$ 19.55	Link	120
424290	$ 19.70	Link	120
110587	$ 19.55	Link	120
382621	$ 19.55	Link	120
396977	$ 19.90	Link	120
569927	$ 19.90	Link	120
398462	$ 19.90	Link	120
538866	$ 19.90	Link	120
49845	$ 20	Link	120
118222	$ 20	Link	120
541704	$ 21	Link	120
410953	$ 21	Link	120
424099	$ 21	Link	120
427031	$ 21	Link	120
132555	$ 21	Link	120
505431	$ 24.90	Link	120
351825	$ 25	Link	120
501652	$ 25	Link	120
76317	$ 25	Link	120
537235	$ 25	Link	120
449207	$ 28	Link	120
362493	$ 28	Link	120
363666	$ 28	Link	120
92344	$ 30	Link	120
87946	$ 30	Link	120
518608	$ 30	Link	120
101521	$ 30	Link	120
108107	$ 30	Link	120
173143	$ 30	Link	120
172910	$ 30	Link	120
507544	$ 30	Link	120
383291	$ 30	Link	120
192967	$ 33	Link	120
343594	$ 33	Link	120
30615	$ 36.41	Link	120
69896	$ 36.99	Link	120
168073	$ 38	Link	120
590636	$ 40	Link	120
296307	$ 42	Link	120
131349	$ 49	Link	120
115052	$ 50	Link	120
270630	$ 75	Link	120
14913	$ 102	Link	120
518535	$ 108	Link	120
440129	$ 25	Link	120.99
259064	$ 32	Link	121.32
266355	$ 20	Link	122.96
238319	$ 40	Link	123.89
466272	$ 20	Link	124.00
198485	$ 32	Link	124.03
26960	$ 21	Link	129.00
217865	$ 24.99	Link	130
73761	$ 20	Link	130.66
533731	$ 28	Link	143.85
63525	$ 30	Link	150
163018	$ 30	Link	150
423278	$ 42.11	Link	150
77	$ 77	Link	150
356194	$ 120	Link	153.87
340350	$ 20	Link	154.46
456681	$ 31	Link	156.71
41291	$ 24	Link	158.06
261722	$ 29	Link	166.88
333140	$ 25	Link	178.22
462505	$ 22	Link	180
540474	$ 26	Link	180
222051	$ 36.99	Link	180
372577	$ 19.30	Link	190.66
147921	$ 21	Link	195.00
382406	$ 30	Link	210
235336	$ 36.99	Link	210
397086	$ 23	Link	210.98
544599	$ 36	Link	212.29
252996	$ 24	Link	219.00
264456	$ 25	Link	225.81
352369	$ 27	Link	227.95
310178	$ 45	Link	232.75
478840	$ 45	Link	236.75
527439	$ 99	Link	237.00
84274	$ 23	Link	238.16
224377	$ 50	Link	239.66
564037	$ 22	Link	240
143017	$ 45	Link	240
3007	$ 30	Link	244.06
9360	$ 35	Link	244.93
251850	$ 34	Link	246.84
435476	$ 29.99	Link	252.29
124729	$ 21.90	Link	256.17
138365	$ 18.99	Link	262.06
549657	$ 22	Link	267.16
459730	$ 35	Link	282.62
468334	$ 22	Link	300
20824	$ 22.90	Link	300
16838	$ 45	Link	300
70703	$ 49.90	Link	307.92
381853	$ 50	Link	330.98
507313	$ 84.21	Link	333.92
216073	$ 34	Link	336.06
476093	$ 25	Link	342.62
345181	$ 22	Link	344.44
595731	$ 45	Link	346.90
384514	$ 35	Link	351.81
208573	$ 34	Link	352.87
510449	$ 28.90	Link	360
514730	$ 50	Link	360
72066	$ 40	Link	366.58
406294	$ 45	Link	366.91
130979	$ 29	Link	375.40
407805	$ 80	Link	389.24
412391	$ 48	Link	390
108707	$ 80	Link	392.17
475991	$ 40	Link	397.06
510469	$ 36	Link	400.8
571466	$ 50	Link	404.11
528853	$ 25	Link	404.95
536160	$ 50	Link	415.29
450127	$ 50	Link	421.03
516413	$ 30	Link	426.76
181702	$ 72	Link	434.36
182233	$ 27	Link	444.41
287546	$ 25	Link	451.89
26522	$ 60	Link	466.17
419283	$ 39	Link	471.09
148803	$ 38.88	Link	475.00
48940	$ 40	Link	489.49
354739	$ 36	Link	498.55
220849	$ 40	Link	506.69
300438	$ 35	Link	507.85
226739	$ 80	Link	517.63
136758	$ 80	Link	517.63
573747	$ 30	Link	519.96
594199	$ 42	Link	524.06
267112	$ 105.26	Link	539.02
12209	$ 45	Link	540.06
521528	$ 80	Link	542.24
110954	$ 31	Link	580.95
66195	$ 31	Link	581.95
57023	$ 32	Link	588.96
429543	$ 45	Link	617.97
395771	$ 40	Link	623.98
460506	$ 50	Link	632.99
345389	$ 50	Link	634.99
312062	$ 50	Link	635.99
74577	$ 50	Link	636.99
405063	$ 55	Link	638.06
19983	$ 40.13	Link	640.98
491685	$ 43	Link	643.82
357693	$ 40	Link	656.94
98871	$ 45	Link	658.00
589816	$ 80	Link	668.98
104376	$ 35	Link	670.46
408870	$ 40	Link	681.95
528120	$ 45	Link	698.00
481365	$ 34	Link	707.20
88186	$ 80	Link	712.75
380652	$ 80	Link	713.54
30761	$ 60	Link	714.46
278145	$ 70	Link	715.00
315335	$ 36	Link	720
354331	$ 40	Link	720
451322	$ 40	Link	720
233102	$ 41.50	Link	720
509303	$ 41.50	Link	720
485853	$ 41.50	Link	720
114749	$ 41.50	Link	720
52513	$ 41.50	Link	720
440998	$ 42.19	Link	720
401089	$ 44	Link	720
263445	$ 45	Link	720
555807	$ 45	Link	720
77695	$ 45	Link	720
54829	$ 45	Link	720
247037	$ 49.98	Link	720
530830	$ 50	Link	720
370357	$ 50	Link	720
328128	$ 50	Link	720
281225	$ 50	Link	720
62531	$ 50	Link	720
524448	$ 50	Link	720
432938	$ 51	Link	720
538726	$ 50	Link	720
442104	$ 51	Link	720
255652	$ 55	Link	720
526500	$ 59.95	Link	720
57761	$ 59.77	Link	720
214325	$ 60	Link	720
73480	$ 60	Link	720
12098	$ 65	Link	720
329668	$ 65	Link	720
545063	$ 67.50	Link	720
126931	$ 80	Link	720
475604	$ 80	Link	720
475604	$ 80	Link	720
149718	$ 100	Link	720
120583	$ 100	Link	720
435868	$ 100	Link	720
429943	$ 100	Link	720
91885	$ 100	Link	720
3187	$ 130	Link	720
115019	$ 136.84	Link	723.40
487716	$ 44.77	Link	730
568203	$ 67	Link	730
44257	$ 100	Link	730
287983	$ 30	Link	741.72
204820	$ 50	Link	741.88
253143	$ 69.90	Link	756.80
232382	$ 38	Link	759.72
501251	$ 180	Link	764.86
415586	$ 57	Link	801.46
30732	$ 60	Link	808.44
324978	$ 38	Link	814.16
86298	$ 49.80	Link	815.98
411797	$ 51.79	Link	815.98
30635	$ 62	Link	837.45
391368	$ 40	Link	849.86
260551	$ 60	Link	867.8
395436	$ 38	Link	870.51
544531	$ 38	Link	881.39
398020	$ 40	Link	887.80
470708	$ 49	Link	894.60
271038	$ 46	Link	900
488833	$ 75	Link	900
27467	$ 75	Link	900
346941	$ 75	Link	900
239073	$ 61.60	Link	909.99
334518	$ 80	Link	920
125650	$ 45	Link	945.67
462164	$ 45	Link	955.68
224468	$ 40	Link	992.05
258123	$ 150	Link	1000.00
39862	$ 74	Link	1020
83010	$ 100	Link	1020
573452	$ 45	Link	1063.76
409695	$ 40	Link	1079.60
569467	$ 52	Link	1080.32
362100	$ 49	Link	1084.00
410236	$ 110	Link	1118.93
62284	$ 80	Link	1122.82
526137	$ 130	Link	1127.05
524161	$ 50	Link	1236.92
558651	$ 80	Link	1237.45
552675	$ 50	Link	1261.65
236254	$ 60	Link	1303.44
560824	$ 55	Link	1312.76
124289	$ 52	Link	1319.94
182313	$ 110	Link	1320
326702	$ 50	Link	1341.25
509475	$ 48	Link	1344.47
332545	$ 45	Link	1348.73
346553	$ 83	Link	1381.28
66207	$ 52	Link	1434.05
115825	$ 50	Link	1439.56
260669	$ 49	Link	1444.37
281184	$ 89	Link	1463.61
446944	$ 50	Link	1485.50
347503	$ 50	Link	1516.45
266308	$ 45	Link	1528.06
265234	$ 42.10	Link	1545.93
27087	$ 50	Link	1549.69
103900	$ 118	Link	1556.95
152354	$ 80	Link	1566.95
402256	$ 52	Link	1613.53
277309	$ 49	Link	1626.40
312294	$ 42	Link	1674.34
249205	$ 42	Link	1675.34
547638	$ 42	Link	1676.34
403757	$ 42	Link	1677.34
360116	$ 75	Link	1731.59
62733	$ 50	Link	1771.61
327749	$ 50	Link	1832.56
245238	$ 50	Link	1856.39
478638	$ 50	Link	1865.41
440459	$ 55	Link	1921.48
402151	$ 90	Link	1924.61
432588	$ 95	Link	1954.53
284546	$ 55	Link	1961.42
300388	$ 80	Link	2005.75
431452	$ 110	Link	2029.51
84466	$ 110	Link	2031.51
26559	$ 110	Link	2031.51
420846	$ 60	Link	2057.57
52621	$ 60	Link	2058.57
254210	$ 60	Link	2080.57
43295	$ 60	Link	2089.33
493869	$ 110	Link	2108.50
506468	$ 63	Link	2142.77
506468	$ 63	Link	2142.77
331193	$ 87.65	Link	2156.45
74851	$ 70	Link	2180.16
4582	$ 90	Link	2189.89
547587	$ 105	Link	2253.06
189301	$ 65	Link	2267.94
473371	$ 100	Link	2280.58
300106	$ 64	Link	2335.49
519102	$ 120	Link	2349.13
304577	$ 62	Link	2412.84
13209	$ 60	Link	2443.80
489625	$ 100	Link	2609.92
34370	$ 120	Link	2611.61
118792	$ 100	Link	2617.92
597976	$ 100	Link	2636.93
381171	$ 69	Link	2640.79
103523	$ 108	Link	2656.56
93428	$ 68	Link	2668.80
482041	$ 100	Link	2669.92
340114	$ 100	Link	2692.94
332313	$ 125	Link	2803.98
578560	$ 120	Link	2803.98
298263	$ 69	Link	2880
34623	$ 74	Link	2880
198813	$ 77.99	Link	2880
459751	$ 77.99	Link	2880
185737	$ 77.99	Link	2880
532939	$ 78	Link	2880
297837	$ 78	Link	2880
459388	$ 80	Link	2880
561922	$ 80	Link	2880
41118	$ 80	Link	2880
456025	$ 80	Link	2880
7278	$ 115	Link	2880
421311	$ 110	Link	2880
186573	$ 135	Link	2880
45204	$ 150	Link	2880
265327	$ 140	Link	2880
244253	$ 150	Link	2880
468381	$ 88	Link	2910
412453	$ 75	Link	2977.37
115054	$ 120	Link	2987.37
154362	$ 130	Link	3001.28
236859	$ 130	Link	3035.30
21021	$ 119.88	Link	3045.61
82261	$ 80	Link	3073.34
165659	$ 130	Link	3110.28
492010	$ 135	Link	3200.44
404241	$ 130	Link	3415.96
46469	$ 80	Link	3587.97
128436	$ 80	Link	3587.97
55017	$ 70	Link	3590.29
269508	$ 79	Link	3600
274538	$ 135	Link	3600
40554	$ 138	Link	3732.29
410718	$ 145	Link	4320
75551	$ 135	Link	4375.00
340019	$ 200	Link	5487.70
451769	$ 200	Link	5491.70
306891	$ 168	Link	5534.57
542127	$ 135	Link	5760
408886	$ 235	Link	5764.08
578750	$ 156.78	Link	5932.29
262309	$ 180	Link	5982.01
517919	$ 230	Link	6379.77
302744	$ 230	Link	6383.77
152756	$ 230	Link	6476.81
214157	$ 248	Link	7920
177659	$ 1,000	Link	7920




`; // Substitua pelos seus próprios dados de exemplo

// Chama a função de ordenação e geração do arquivo HTML
ordenarPorMelhorPrecoPorMinuto(dadosStr);
