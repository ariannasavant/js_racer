class Game < ActiveRecord::Base
  has_many :players, through: :rounds
end
