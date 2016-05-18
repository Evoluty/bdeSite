# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

Club.create(nom: 'test', description: 'hello ce club est trop bien !', president: 'Président')
Partenaire.create(nom: 'test', typePartenaire: 'argent', description: 'hello ce club est trop bien !', adresse: '11 rdv')
