<?php

namespace App\Controller;

use App\Repository\CategorieRepository;
use App\Repository\FormuleRepository;
use App\Repository\HoraireRepository;
use App\Repository\MenuRepository;
use App\Repository\PlatRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class LacarteController extends AbstractController
{
    #[Route('/lacarte', name: 'app_lacarte')]
    public function index(HoraireRepository $horaireRepository, PlatRepository $platRepository, 
        FormuleRepository $formuleRepository,CategorieRepository $categorieRepository, MenuRepository $menuRepository): Response
    {
        return $this->render('lacarte/index.html.twig', [
            'horaires' => $horaireRepository->findAll(),
            'plats' => $platRepository->findAll(),
            'categories' => $categorieRepository->findAll(),
            'formules' => $formuleRepository->findAll(),
            'menus' => $menuRepository->findAll(),
        ]);
    }
}
