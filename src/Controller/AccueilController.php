<?php

namespace App\Controller;

use App\Repository\HoraireRepository;
use App\Repository\PhotoRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class AccueilController extends AbstractController
{
    #[Route('/', name: 'app_accueil')]
    public function index(HoraireRepository $horaireRepository, PhotoRepository $photoRepository): Response
    {
        $photosRep = $photoRepository->findAll();
        // 4 photos sur la page d'accueil
        $photos_nom = [0,0,0,0];
        $photos_titre = ['','','',''];

        
        foreach ($photosRep as $photo) {
            switch($photo->getApparition()) {
                case 1:
                    $photos_nom[0] =  $photo->getChemin();
                    $photos_titre[0] =  $photo->getTitre();
                    break;
                case 2:
                    $photos_nom[1] =  $photo->getChemin();
                    $photos_titre[1] =  $photo->getTitre();
                    break;
                case 3:
                    $photos_nom[2] =  $photo->getChemin();
                    $photos_titre[2] =  $photo->getTitre();
                    break;
                case 4:
                    $photos_nom[3] =  $photo->getChemin();
                    $photos_titre[3] =  $photo->getTitre();
                    break;
            }
        }
        
        return $this->render('accueil/index.html.twig', [
            'horaires' => $horaireRepository->findAll(),
            'photos_nom' => $photos_nom,
            'photos_titre' => $photos_titre,
        ]);
    }
}
