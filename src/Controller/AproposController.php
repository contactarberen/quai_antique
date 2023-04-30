<?php

namespace App\Controller;

use App\Repository\HoraireRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class AproposController extends AbstractController
{
    #[Route('/apropos', name: 'app_apropos')]
    public function index(HoraireRepository $horaireRepository): Response
    {
        return $this->render('apropos/index.html.twig', [
            'horaires' => $horaireRepository->findAll(),
        ]);
    }
}
