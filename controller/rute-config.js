    angular.module('MainCtrl', []).controller('MainCtrl', ['$rootScope', '$scope', '$log',
        function($rootScope, $scope, $log) {
            var ctrl = this;

            ctrl.speed = 500;
            ctrl.mainViewStyle = 'anim-fade';
            ctrl.page1Style = 'anim-zoom-out';
            ctrl.page2Style = 'anim-slide-below-fade';

            $rootScope.$on('animStart', function() {
                $log.log('animStart');
            });

            $rootScope.$on('animEnd', function() {
                $log.log('animEnd');
            });
        }
    ]);

    var app = angular.module('ngRouteExample', ['ngAnimate', 'ui.router', 'anim-in-out', 'MainCtrl'])
        .config(['$stateProvider', '$locationProvider', '$urlMatcherFactoryProvider', '$urlRouterProvider',
            function($stateProvider, $locationProvider, $urlMatcherFactoryProvider, $urlRouterProvider) {

                // $locationProvider.html5Mode(true);

                // Allow trailing slashes
                $urlMatcherFactoryProvider.strictMode(false);
        $urlRouterProvider.otherwise('home');
        $stateProvider
            .state('content', {
                url: '/',
                views: {
                    "": { templateUrl: 'template/view/content.html' },
                    "footer@content": {
                        templateUrl: 'template/view/footer.html',
                        controller: "myController",
                    }
                }
            })
            .state('content.home', {
                url: 'home',
                data: { pageTitle: '首页' },
                views: {
                    "header@content": {
                        templateUrl: 'template/view/home/home.html',
                        controller: "myController",
                    }
                }

            })
            .state('content.home.distributed_center', {
                url: '/distributed_center',
                data: { pageTitle: '集散中心介绍' },
                views: {
                    "header@content": {
                        templateUrl: 'template/view/home/distributed-center.html',
                        controller: "myController",
                    }
                }

            })
            .state('content.home.cooperative_partner', {
                url: '/cooperative_partner',
                data: { pageTitle: '合作伙伴' },
                views: {
                    "header@content": {
                        templateUrl: 'template/view/home/cooperative-partner.html',
                        controller: "myController",
                    }
                }

            })
            .state('content.home.ticket', {
                url: '/ticket',
                data: { pageTitle: '景区门票' },
                views: {
                    "header@content": {
                        templateUrl: 'template/view/home/ticket.html',
                        controller: "myController",
                    }
                }

            })
            .state('ticket-details', {
                url: '/details',
                data: { pageTitle: '景区门票详情' },
                templateUrl: 'template/view/home/view-ticket_details.html',
                controller: "myController",
            })
            .state('content.order', {
                url: 'order?id',
                data: { pageTitle: '订单' },
                views: {
                    "header@content": {
                        templateUrl: 'template/view/order/order.html',
                        controller: "myController",
                        controllerAs: 'orderController',
                    }
                }
            })
            .state('content.personal-center', {
                url: 'personal-center',
                data: { pageTitle: '我的' },
                views: {
                    "header@content": { templateUrl: 'template/view/personal-center/personal-center.html' }
                }
            })
            .state('login', {
                titlt: 'login',
                data: { pageTitle: '用户登入' },
                url: '/login',
                templateUrl: 'template/view/login/login.html',
            })
            .state('register', {
                titlt: 'register',
                data: { pageTitle: '用户注册' },
                url: '/register',
                templateUrl: 'template/view/register/register.html',
            })

    }])

    .run(
        ['$rootScope', '$state', '$stateParams',
            function($rootScope, $state, $stateParams) {
                $rootScope.$state = $state;
                $rootScope.$stateParams = $stateParams;
            }
        ]
    )