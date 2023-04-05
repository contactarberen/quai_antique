<?php

namespace App\DataFixtures;

use App\Entity\JourSemaine;
use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class AppFixtures extends Fixture
{
    public function __construct (UserPasswordHasherInterface $passwordHasher) 
    {
        $this->passwordHasher = $passwordHasher;
    }
    
    public function load(ObjectManager $manager): void
    {
        $user = new User($this->passwordHasher);
        $user->setEmail("admin@lequaiantique.fr")->setPassword("321")->setRoles(["ROLE_USER", "ROLE_ADMIN"]);
        
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

        $manager->persist($user);
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
