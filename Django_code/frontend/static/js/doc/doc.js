$(document).ready(function () {
    // $('#sidebar-menu').metisMenu();

    //当浏览器窗口大小改变时，更新菜单高度
    $(window).resize(function () {
        if ($(window).width() < 768) {
            $('#sidebar-menu').css('max-height', 'none');
        } else {
            var height = $(window).height() - $('#top-navbar').outerHeight() - $('#footer').outerHeight() - 50;
            $('#sidebar-menu').css('max-height', height + 'px');
        }
    }).resize();

    //当在移动设备上收起菜单时，添加展开按钮
    $('.sidebar-mobile-toggle').click(function () {
        var menu = $('#sidebar-menu');
        if (menu.hasClass('sidebar-mobile-show')) {
            menu.removeClass('sidebar-mobile-show');
            $('.sidebar-mobile-toggle i').removeClass('fa-angle-up').addClass('fa-angle-down');
        } else {
            menu.addClass('sidebar-mobile-show');
            $('.sidebar-mobile-toggle i').removeClass('fa-angle-down').addClass('fa-angle-up');
        }
    });

    $('.metismenu li a').on('click', function () {
        // remove active class from previous active menu item
        $('.metismenu li a.active').removeClass('active');
        // add active class to newly clicked menu item
        $(this).addClass('active');
    });

    $('#sidebar-menu').metisMenu({
        subMenu: false
    });

    $(function () {
        $('[data-toggle="tooltip"]').tooltip()
    })
    // $(function () {
    //     $('[data-toggle="tooltip"]').tooltip({
    //         placement: 'right', // 设置默认提示框位置为上方
    //         trigger: 'hover', // 鼠标悬停时触发提示框
    //         container: 'body', // 将提示框添加到文档的 body 元素中，避免被其他元素遮挡
    //         // 当提示框显示时，执行以下回调函数来调整其位置和样式
    //         onShown: function () {
    //             var $tooltip = $(this.tip); // 获取提示框元素
    //             var $element = $(this.$element); // 获取对应元素
    //             var elementOffset = $element.offset(); // 获取对应元素的坐标信息
    //             var tooltipWidth = $tooltip.outerWidth(); // 获取提示框的宽度信息
    //             // 计算提示框应该出现在对应元素上方还是下方
    //             var placement = (elementOffset.top - $tooltip.outerHeight() > $(window).scrollTop()) ? 'top' : 'bottom';
    //             // 根据计算结果设置提示框的位置
    //             $tooltip.removeClass('top bottom').addClass(placement).css({
    //                 top: (placement == 'top') ? (elementOffset.top - $tooltip.outerHeight()) : (elementOffset.top + $element.outerHeight()),
    //                 left: (elementOffset.left + $element.outerWidth() / 2 - tooltipWidth / 2)
    //             });
    //             // 使用 text-justify 属性实现文字左右两端对齐
    //             $tooltip.find('.tooltip-inner').css('text-justify', 'inter-word');
    //         }
    //     });
    // });

});