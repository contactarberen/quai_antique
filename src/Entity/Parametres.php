<?php

namespace App\Entity;

use App\Repository\ParametresRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: ParametresRepository::class)]
class Parametres
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(nullable: true)]
    private ?int $nbConviveSeuil = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getNbConviveSeuil(): ?int
    {
        return $this->nbConviveSeuil;
    }

    public function setNbConviveSeuil(?int $nbConviveSeuil): self
    {
        $this->nbConviveSeuil = $nbConviveSeuil;

        return $this;
    }
}
