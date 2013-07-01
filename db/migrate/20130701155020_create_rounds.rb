class CreateRounds < ActiveRecord::Migration
  def change
    create_table :rounds do |t|
      t.belongs_to :game
      t.belongs_to :player
      t.timestamps
    end
  end
end
