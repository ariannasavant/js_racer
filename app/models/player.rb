class Player < ActiveRecord::Base
  has_many :games, through: :rounds
  has_many :rounds
  validates_uniqueness_of :name
  validates_presence_of :name
end
