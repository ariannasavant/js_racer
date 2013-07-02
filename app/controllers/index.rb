get '/' do
  # Look in app/views/index.erb
  erb :index
end

get '/game/:round_id' do
  @round_id = params[:round_id]
  erb :game
end

get '/game/:round_id/results' do
  @round_id = params[:round_id]
  erb :results
end

post '/' do
  @player1 = Player.find_or_create_by_name(params[:player1_name])
  @player2 = Player.find_or_create_by_name(params[:player2_name])
  @game = Game.create
  @player1.games << @game
  @player2.games << @game
  @round = Round.last
redirect "/game/#{@round.id}"
end

post '/game/:round_id' do

  # save winner info and elapsed time
  # return game info as JSON
  # content_type :json
  # { i_can_has: "anything i wantz!", round_id: params[:round_id].to_i }.to_json

  # ... OR ...

  # render game results as HTML and render a partial (i.e., :layout => false)
  @round = Round.find(params[:round_id])
  erb :results, :layout => false

  #@round_id = params[:round_id].to_json
  # redirect "/game/#{@round_id}/results" 
end
