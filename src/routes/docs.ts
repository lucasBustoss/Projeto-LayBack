/**
 * @swagger
 * /api/fixtures/save:
 *   get:
 *     summary: Busca e salva todas as partidas disponíveis entre hoje e 7 dias atrás.
 *     responses:
 *       200:
 *         description: Sucesso. Retorna uma mensagem de sucesso.
 * /api/fixtures/:
 *   get:
 *     summary: Retorna as partidas salvas no banco de dados.
 *     parameters:
 *      - in: query
 *        name: leagueId
 *        schema:
 *          type: integer
 *        required: false
 *        description: Filtro das partidas pelo ID da liga.
 *      - in: query
 *        name: homeTeamId
 *        schema:
 *          type: integer
 *        required: false
 *        description: Filtro das partidas pelo ID do time mandante.
 *      - in: query
 *        name: awayTeamId
 *        schema:
 *          type: integer
 *        required: false
 *        description: Filtro das partidas pelo ID do time visitante.
 *      - in: query
 *        name: initialDate
 *        schema:
 *          type: integer
 *        required: false
 *        description: Filtro das partidas pela data inicial (requer parâmetro 'finalDate' preenchido).
 *      - in: query
 *        name: finalDate
 *        schema:
 *          type: integer
 *        required: false
 *        description: Filtro das partidas pela data final (requer parâmetro 'initialDate' preenchido).
 *     responses:
 *       200:
 *         description: Sucesso. Retorna uma lista de partidas finalizadas.
 * 
 * /api/fixtures/live:
 *   get:
 *     summary: Retorna as partidas ao vivo, a partir da API.
 *     parameters:
 *      - in: query
 *        name: leagueId
 *        schema:
 *          type: integer
 *        required: false
 *        description: Filtro das partidas pelo ID da liga.
 *      - in: query
 *        name: homeTeamId
 *        schema:
 *          type: integer
 *        required: false
 *        description: Filtro das partidas pelo ID do time mandante.
 *      - in: query
 *        name: awayTeamId
 *        schema:
 *          type: integer
 *        required: false
 *        description: Filtro das partidas pelo ID do time visitante.
 *     responses:
 *       200:
 *         description: Sucesso. Retorna uma lista de partidas ao vivo.
 */