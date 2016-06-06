# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

Role.create(name: 'Administrateur')
Role.create(name: 'Editeur')
Role.create(name: 'Membre')
Job.create(M: 'Président', F: 'Présidente')
Job.create(M: 'Vice Président', F: 'Vice Présidente')
Job.create(M: 'Trésorier', F: 'Trésorière')
Job.create(M: 'Vice Trésorier', F: 'Vice Trésorière')
Job.create(M: 'Secrétaire', F: 'Secrétaire')
Club.create(nom: 'test', description: 'hello ce club est trop bien !', president: 'Président')
Member.create(name: 'bde', firstname: 'bde', email: 'bde@yopmail.com', role_id: 1, password_digest: '$2a$10$Lu2B6mwpt63Z5S6IMg5d7u8IeKoAwxH00mWflyQp37XvGt1Ltueiq')
Partenaire.create(nom: 'test', typePartenaire: 'argent', description: 'hello ce club est trop bien !', adresse: '11 rdv')
