class Game < ActiveRecord::Base
  has_many :players, :through => :rounds
  has_many :rounds
end
