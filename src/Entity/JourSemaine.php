<?php

namespace App\Entity;

use App\Repository\JourSemaineRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: JourSemaineRepository::class)]
class JourSemaine
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $NomJour = null;

    #[ORM\OneToMany(mappedBy: 'jour', targetEntity: Horaire::class)]
    private Collection $horaires;

    public function __construct()
    {
        $this->horaires = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getNomJour(): ?string
    {
        return $this->NomJour;
    }

    public function setNomJour(string $NomJour): self
    {
        $this->NomJour = $NomJour;

        return $this;
    }

    /**
     * @return Collection<int, Horaire>
     */
    public function getHoraires(): Collection
    {
        return $this->horaires;
    }

    public function addHoraire(Horaire $horaire): self
    {
        if (!$this->horaires->contains($horaire)) {
            $this->horaires->add($horaire);
            $horaire->setJour($this);
        }

        return $this;
    }

    public function removeHoraire(Horaire $horaire): self
    {
        if ($this->horaires->removeElement($horaire)) {
            // set the owning side to null (unless already changed)
            if ($horaire->getJour() === $this) {
                $horaire->setJour(null);
            }
        }

        return $this;
    }
    public function __toString(){
        return $this->NomJour; // Remplacer champ par une propriété "string" de l'entité
    }
}
