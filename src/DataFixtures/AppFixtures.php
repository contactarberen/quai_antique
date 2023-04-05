<?php

namespace App\DataFixtures;

use App\Entity\JourSemaine;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class AppFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        $lundi = new JourSemaine();
        $lundi->setNomJour("Lundi");
        $mardi = new JourSemaine();
        $mardi->setNomJour("Mardi");
        $mercredi = new JourSemaine();
        $mercredi->setNomJour("Mercredi");
        $jeudi = new JourSemaine();
        $jeudi->setNomJour("Jeudi");
        $vendredi = new JourSemaine();
        $vendredi->setNomJour("Vendredi");
        $samedi = new JourSemaine();
        $samedi->setNomJour("Samedi");
        $dimanche = new JourSemaine();
        $dimanche->setNomJour("Dimanche");

        $manager->persist($lundi);
        $manager->persist($mardi);
        $manager->persist($mercredi);
        $manager->persist($jeudi);
        $manager->persist($vendredi);
        $manager->persist($samedi);
        $manager->persist($dimanche);

        $manager->flush();
    }
}
