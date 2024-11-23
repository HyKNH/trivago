package com.hotel.controller;

import com.hotel.pojo.Vip;
import com.hotel.service.VipServiceImpl;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpSession;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

@Controller
@RequestMapping("/vip")
public class VipController {
    private static final SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
    private static final String SESSION_USER = "LOGINUSER";
    private static final String DEFAULT_VIP_NAME = "VIP_Customer";
    private static final String DEFAULT_VIP_SEX = "Male";
    private static final String DEFAULT_VIP_TYPE = "Level_1";

    @Autowired
    HttpSession session;
    @Autowired
    VipServiceImpl vipService;



    @RequestMapping("/add")
    public ModelAndView add(Vip vip) {
        ModelAndView mv = new ModelAndView();
        vipService.addVip(vip);
        mv.setViewName("suc_v");
        return mv;
    }

    @RequestMapping("/delete")
    public String delete(int id) {
        vipService.deleteVipById(id);
        return "redirect:/vip/list";
    }

    @RequestMapping("/list")
    public ModelAndView list() {
        ModelAndView mv = new ModelAndView();
        List<Vip> vipList = vipService.queryAllVip();
        mv.addObject("list", vipList);
        mv.setViewName("vip_list");
        return mv;
    }

    @RequestMapping("/update1")
    public ModelAndView update1(int id) {
        ModelAndView mv = new ModelAndView();
        Vip vip = vipService.queryVipById(id);
        mv.addObject("v", vip);
        mv.setViewName("vip_update");
        return mv;
    }


    @RequestMapping("/login")
    public ModelAndView login(String username, String password) {
        ModelAndView mv = new ModelAndView();
        try {
            Vip vip = vipService.findByLogin(username, password);
            if (vip != null) {
              /*  if (vip.getPassword().equals(password)) {
                    session.setAttribute(SESSION_USER, vip);
                    mv.setViewName("vip/index");
                    return mv;
                }*/
                mv.setViewName("vip/index");
                return mv;
            }
            mv.setViewName("vip/index");
           // mv.addObject("result", "wrong password");
          //  mv.setViewName("vip/error");
            return mv;
        } catch (Exception e) {
            e.printStackTrace();
            mv.addObject("result", "System Error");
            mv.setViewName("vip/error");
        }
        return mv;
    }

    @RequestMapping("/register")
    public ModelAndView register(Vip vip) {
        ModelAndView mv = new ModelAndView();
        if (StringUtils.isBlank(vip.getAccount())) {
            mv.addObject("result", "Account cannot be empty");
            mv.setViewName("vip/error");
            return mv;
        }
        if (StringUtils.isBlank(vip.getPassword())) {
            mv.addObject("result", "Password cannot be empty");
            mv.setViewName("vip/error");
            return mv;
        }
        if (!vip.getPassword().equals(vip.getConfirmPassword())) {
            mv.addObject("result", "Passwords do not match");
            mv.setViewName("vip/error");
            return mv;
        }
        Vip existVip = vipService.queryVipByAccount(vip.getAccount());
        if (existVip != null) {
            mv.addObject("result", "The account already exists");
            mv.setViewName("vip/error");
            return mv;
        }
        vip.setName(DEFAULT_VIP_NAME);
        vip.setSex(DEFAULT_VIP_SEX);
        vip.setEmail("0");
        vip.setPhone(0);
        vip.setV_Type(DEFAULT_VIP_TYPE);
        vip.setStartTime(sdf.format(new Date()));
        Calendar instance = Calendar.getInstance();
        instance.add(Calendar.YEAR, 1);
        vip.setEndTime(sdf.format(instance.getTime()));
        vipService.addVip(vip);
        mv.addObject("url", "/vip");
        mv.setViewName("vip/suc");
        return mv;
    }
}

