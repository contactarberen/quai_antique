<?php

namespace App\Controller;

use App\Repository\HoraireRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class AccueilController extends AbstractController
{
    #[Route('/', name: 'app_accueil')]
    public function index(HoraireRepository $horaireRepository): Response
    {
        return $this->render('accueil/index.html.twig', [
            'horaires' => $horaireRepository->findAll(),
        ]);
    }
}
