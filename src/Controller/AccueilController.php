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
        $photos = [0,0,0,0];
        
        foreach ($photosRep as $photo) {
            switch($photo->getApparition()) {
                case 1:
                    $photos[0] =  $photo->getChemin();
                    break;
                case 2:
                    $photos[1] =  $photo->getChemin();
                    break;
                case 3:
                    $photos[2] =  $photo->getChemin();
                    break;
                case 4:
                    $photos[3] =  $photo->getChemin();
                    break;
            }
        }
        
        return $this->render('accueil/index.html.twig', [
            'horaires' => $horaireRepository->findAll(),
            'photos' => $photos,
        ]);
    }
}
